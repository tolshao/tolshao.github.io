// src/plugins/remark-note.js
import { visit } from 'unist-util-visit';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { renderMermaidSVG } from '@xingwangzhe/satteri-mermaid';

// 把正文里 ../image/foo.jpg、./image/foo.jpg、image/foo.jpg 统一改写为
// /image/foo.jpg（站点根绝对路径）。copy-blog-images 集成把图片拷贝到 dist/image/。
function normalizeArticleImageSrc(src: unknown): string | undefined {
  if (typeof src !== 'string' || !src) return undefined;
  const m = src.match(/^(?:\.\.?\/)?image\/([^)\s]+?)\s*$/);
  if (m) return '/image/' + m[1];
  return undefined;
}

// 预处理文本：移除 LaTeX 公式内容，防止其干扰字数统计
function stripLatexForWordCount(text: string): string {
  // Remove display math \[ ... \] and $$, \begin{}...\end{}
  let t = text.replace(/\\\[[\s\S]*?\\\]/g, ' ');
  t = t.replace(/\$\$[\s\S]*?\$\$/g, ' ');
  t = t.replace(/\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}/g, ' ');
  // Remove inline math $...$
  t = t.replace(/\$[^$\n]+\$/g, ' ');
  // Normalize whitespace
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

// 处理标签
const remarkNote = () => {
  return (tree: any, { data: astroData }: any) => {
    // 文章字数统计（单独遍历，避免嵌套 visit）
    // 先预处理移除 LaTeX 公式，再统计字数，避免 $ \ \ 等字符干扰
    const textOnPage = stripLatexForWordCount(toString(tree));
    const readingTime = getReadingTime(textOnPage);
    console.log("[DEBUG] words:", readingTime.words, "min:", readingTime.minutes, "fm:", JSON.stringify(astroData.astro.frontmatter));
    astroData.astro.frontmatter.reading_time = readingTime.minutes;
    astroData.astro.frontmatter.article_word_count = readingTime.words;

    visit(tree, (node) => {
      const { type, name, attributes } = node;
      // 处理组件
      if (type == 'textDirective' || type == 'leafDirective' || type == 'containerDirective') {
        // 设置 HTML 标签和 class
        const data = node.data || (node.data = {});
        const hProperties = data.hProperties || (data.hProperties = {});
        // 根据指令类型设置标签
        data.hName = name == 'btn' ? 'a' : 'section';
        // 这是 a 标签
        attributes.link && (hProperties.href = attributes.link);
        // 校验相册元素
        if (name == 'picture') {
          node.children = node.children.flatMap((child: any) => (child.type === 'paragraph' ? child.children : child));
        }
        // 处理 video 组件
        if (name.startsWith('vh')) {
          Object.keys(node.attributes).forEach((i: any) => (hProperties[`data-${i}`] = node.attributes[i]));
        }
        // 设置 class
        hProperties.class = `vh-node vh-${name}${attributes.type ? ` ${name}-${attributes.type}` : ''}`;
      }
    });
  };
}


// 只在标题（h2–h6）内去掉 rehype-katex 输出的 <annotation>。
// 完整正文里仍保留 annotation，作为 MathML 不识别时的 LaTeX 回退（屏幕阅读器、无障碍）。
// 但 TOC 之类靠 textContent 抽取标题文字的场景会把 annotation 的 LaTeX 原文也带进去，
// 显示为 V_{g'} 这种源码。这里只对 heading 节点做剔除。
const stripKatexAnnotations = () => {
  return (tree: any) => {
    const isHeading = (n: any) =>
      n && n.type === 'element' && /^h[2-6]$/.test(n.tagName);
    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName !== 'annotation') return;
      if (!parent || !isHeading(parent)) return;
      parent.children = (parent.children as any[]).filter((c) => c !== node);
    });
  };
};


//  处理 HTML 标签
const addClassNames = () => {
  return (tree: any) => {
    visit(tree, (node, index, parent) => {
      // 处理 a 标签
      if (node.tagName === 'a') {
        node.properties.target = '_blank', node.properties.rel = 'noopener nofollow'
        node.children = [{ type: 'element', tagName: 'span', children: node.children || [] }];
        // 处理 pre 标签
      } else if (node.tagName === 'pre') {
        const divNode = { type: 'element', tagName: 'section', properties: { class: 'vh-code-box' }, children: [{ type: 'element', tagName: 'span', properties: { class: 'vh-code-copy' } }, node] };
        // 替换父节点的 children 中的 pre 节点为新的 div 节点
        if (parent && index !== null) parent.children.splice(index, 1, divNode);
        // 处理 img 标签
      } else if (node.tagName === 'img') {
        // 添加 class 和 loading 属性
        node.properties.class = 'vh-article-img';
        // 把 ../image/... 规范化为相对文章页路径 ./image/...
        const realSrc = normalizeArticleImageSrc(node.properties.src) || node.properties.src;
        node.properties['data-vh-lz-src'] = realSrc;
        node.properties.src = '/assets/images/lazy-loading.webp';
        // 处理 section 标签
      } else if (node.tagName === 'section') {
        if (node.properties.class && node.properties.class.includes('vh-vhVideo')) {
          node.children = [{ type: 'element', tagName: 'section', properties: { class: 'vh-space-loading' }, children: [{ type: 'element', tagName: 'span' }, { type: 'element', tagName: 'span' }, { type: 'element', tagName: 'span' }] }];
        }
      }
    });

  };
}

// 在 rehype 阶段把 ```mermaid 代码块替换为内联 SVG。
// 必须在 addClassNames 之前运行，避免被 vh-code-box 包装。
// shiki 已经把 ```mermaid 渲染成 <pre class="astro-code" data-language=mermaid>…，
// 因此按 data-language / <code class="language-mermaid"> 双重判定。
const rehypeMermaid = () => {
  return (tree: any) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === null) return;
      if (node.tagName !== 'pre') return;
      const props = node.properties || {};
      const dataLang = props['dataLanguage'] ?? props['data-language'];
      const langAttr = Array.isArray(dataLang) ? dataLang[0] : dataLang;
      const preClasses = ([] as string[]).concat(props.class || []);

      let isMermaid = langAttr === 'mermaid' || preClasses.includes('language-mermaid');

      const codeChild = (node.children || []).find(
        (c: any) => c.type === 'element' && c.tagName === 'code',
      );
      if (!isMermaid && codeChild) {
        const cls = (codeChild.properties && codeChild.properties.class) || [];
        const classList = Array.isArray(cls) ? cls : [cls];
        isMermaid = classList.includes('language-mermaid') || classList.includes('lang-mermaid');
      }
      if (!isMermaid) return;

      // 还原源码：shiki 把每行包成 <span class="line">…</span>，需要把 span 内的纯文本拼回
      const collectText = (n: any): string => {
        if (!n) return '';
        if (n.type === 'text') return n.value || '';
        if (n.type === 'element') {
          let out = '';
          for (const c of n.children || []) out += collectText(c);
          if (n.tagName === 'span' && (n.properties?.class || []).includes?.('line')) {
            return out + '\n';
          }
          return out;
        }
        return '';
      };
      const source = collectText(codeChild || node).trim();
      if (!source) return;

      let svg: string;
      try {
        svg = renderMermaidSVG(source, {
          responsive: true,
          theme: 'default',
          background: 'transparent',
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[rehype-mermaid] render failed:', (e as Error).message);
        return;
      }

      const divNode = {
        type: 'element',
        tagName: 'div',
        properties: { class: 'vh-mermaid' },
        children: [{ type: 'raw', value: svg }],
      };
      parent.children.splice(index, 1, divNode);
    });
  };
};

export { remarkNote, addClassNames, rehypeMermaid, stripKatexAnnotations }