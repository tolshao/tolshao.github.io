import path from "path";
import fs from "fs";
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import Compress from "@playform/compress";
import Compressor from "astro-compressor";
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Markdown 配置================
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import { remarkNote, addClassNames, rehypeMermaid, stripKatexAnnotations } from './src/plugins/markdown.custom'
// Markdown 配置================
import SITE_INFO from './src/config';
import swup from '@swup/astro';

// 扫描 src/content/blog/ 下的 md/mdx，提取正文与 frontmatter 中的 ../image/... 引用，
// 把对应图片从 src/content/image/ 拷贝到 dist/image/，使 markdown.custom.ts 改写的
// /image/... 绝对路径在文章页能正确索引。dev 模式下注入 Vite 中间件把 /image/...
// 直接映射到 src/content/image/。
const copyBlogImages = () => ({
	name: 'copy-blog-images',
	hooks: {
		'astro:config:setup': ({ command, updateConfig }) => {
			if (command !== 'dev') return;
			updateConfig({
				vite: {
					plugins: [{
						name: 'serve-blog-images-dev',
						configureServer(server) {
							const srcImgDir = path.resolve(__dirname, 'src/content/image');
							server.middlewares.use((req, res, next) => {
								const m = (req.url || '').match(/^\/image\/(.+)$/);
								if (!m) return next();
								let imgPath;
								try { imgPath = decodeURIComponent(m[1]); } catch { imgPath = m[1]; }
								const filePath = path.join(srcImgDir, imgPath);
								if (!fs.existsSync(filePath)) return next();
								res.setHeader('Content-Type', 'image/' + path.extname(filePath).slice(1).toLowerCase());
								fs.createReadStream(filePath).pipe(res);
							});
						}
					}]
				}
			});
		},
		'astro:build:done': async ({ dir }) => {
			const distDir = fileURLToPath(dir);
			const blogDir = path.resolve(__dirname, 'src/content/blog');
			const srcImgDir = path.resolve(__dirname, 'src/content/image');
			const distImgDir = path.resolve(distDir, 'image');
			if (!fs.existsSync(blogDir)) return;

			const mdFiles = fs.readdirSync(blogDir).filter(f => /\.(md|mdx)$/i.test(f));
			const mdImgRe = /!\[[^\]]*\]\(\s*(?:\.\.?\/)?image\/([^)\s]+?)\s*\)/g;
			const coverRe = /^cover:\s*["']?(?:\.\.?\/)?image\/([^"'\s]+?)["']?\s*$/m;
			const refs = new Set();

			for (const file of mdFiles) {
				const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
				const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
				if (!fmMatch) continue;
				const fm = fmMatch[1];
				const body = content.slice(fmMatch[0].length);
				let m;
				while ((m = mdImgRe.exec(body))) refs.add(m[1]);
				const coverMatch = fm.match(coverRe);
				if (coverMatch) refs.add(coverMatch[1]);
			}

			for (const ref of refs) {
				// Typora 等编辑器把中文文件名写成 URL 编码形式，磁盘上是原始字符，
				// 这里统一解码后再定位源文件；目标文件名使用解码后的形式，便于静态服务器回溯。
				const decoded = (() => { try { return decodeURIComponent(ref); } catch { return ref; } })();
				const src = path.join(srcImgDir, decoded);
				const dst = path.join(distImgDir, decoded);
				if (!fs.existsSync(src)) {
					console.warn(`[copy-blog-images] missing: ${src}`);
					continue;
				}
				fs.mkdirSync(path.dirname(dst), { recursive: true });
				fs.copyFileSync(src, dst);
			}
		}
	}
});
// https://astro.build/config
export default defineConfig({
	site: SITE_INFO.Site,
	build: { assets: 'vh_static' },
	integrations: [swup({
		theme: false,
		animationClass: "vh-animation-",
		containers: [".main-inner>.main-inner-content", '.vh-header>.main'],
		smoothScrolling: true,
		progress: true,
		cache: true,
		preload: true,
		accessibility: true,
		updateHead: true,
		updateBodyClass: false,
		globalInstance: true
	}),
	Compress({ Image: false, Action: { Passed: async () => true } }),
	sitemap({
		// 处理末尾带 / 的 url
		serialize: (item) => ({ ...item, url: item.url.endsWith('/') ? item.url.slice(0, -1) : item.url })
	}),
	mdx({ extendMarkdownConfig: false }),
	copyBlogImages(),
	Compressor({ gzip: false, brotli: true, fileExtensions: [".html", ".css", ".js"] })
	],
	markdown: {
		remarkPlugins: [remarkMath, remarkDirective, remarkNote,],
		rehypePlugins: [[
			rehypeKatex, {
				output: 'mathml',
				trust: true,
				strict: false
			}
		], rehypeRaw, rehypeSlug, rehypeMermaid, stripKatexAnnotations, addClassNames],
		syntaxHighlight: 'shiki',
		shikiConfig: { theme: 'github-light' },
	},
	vite: {
		resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
		// satteri-mermaid 通过 createRequire(import.meta.url) 加载 napi-rs 预编译 .node，
		// 必须保持为真实 Node 模块，否则 Vite 打包后会找不到 index.cjs / *.node
		ssr: { external: ['@xingwangzhe/satteri-mermaid'] }
	},
	server: { host: '0.0.0.0' }
});