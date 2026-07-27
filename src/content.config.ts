import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// 把 frontmatter 中的相对图片引用 (`../image/...`、`./image/...`、`image/...`)
// 改写为站点根绝对路径 `/image/<...>`，与正文图片保持一致；copy-blog-images
// 集成负责把图片拷贝到 dist/image/。
const coverSchema = z.string().optional().transform((val) => {
	if (!val) return val;
	if (/^(https?:|data:|\/\/)/.test(val)) return val;
	if (val.startsWith('/image/')) return val;
	const m = val.match(/^(?:\.\.?\/)?image\/([^)\s]+?)\s*$/);
	if (m) return '/image/' + m[1];
	return val;
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		categories: z.string(),
		tags: z.array(z.union([z.string(), z.number()])).optional(),
		id: z.union([z.string(), z.number()]),
		cover: coverSchema,
		recommend: z.boolean().optional(),
		hide: z.boolean().optional(),
	    top: z.boolean().optional(),
		// 字数统计（由 remark-note 插件自动计算写入）
		reading_time: z.number().optional(),
		article_word_count: z.number().optional(),
	}),
});

export const collections = { blog };
