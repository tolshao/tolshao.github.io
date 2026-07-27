import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// 把 frontmatter 中的相对图片引用 (`../images/...`、`./images/...`、`images/...`)
// 改写为指向 public/assets/images/blog/<...> 的绝对 URL，与正文图片保持一致。
const coverSchema = z.string().optional().transform((val) => {
	if (!val) return val;
	if (/^(https?:|data:|\/\/)/.test(val)) return val;
	if (val.startsWith('/assets/images/blog/')) return val;
	const m = val.match(/^(?:\.\.?\/)?images\/(.+)$/);
	if (m) return '/assets/images/blog/' + m[1];
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
