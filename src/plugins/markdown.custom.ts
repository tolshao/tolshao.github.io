// src/plugins/remark-note.js
import { visit } from 'unist-util-visit';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

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
        node.properties['data-vh-lz-src'] = node.properties.src;
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

export { remarkNote, addClassNames }