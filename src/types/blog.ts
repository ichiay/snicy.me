import { z } from "zod";

const dateRegex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/;

// blogFile
const _BlogFile = z.object({
  name: z.string(),
  path: z.string(),
  slug: z.string(),
});
export type BlogFile = z.infer<typeof _BlogFile>;
export const isBlogFile = (value: unknown): value is BlogFile => {
  return (
    value !== undefined && value !== null && _BlogFile.safeParse(value).success
  );
};

// BlogMeta
const _BlogMeta = z
  .object({
    title: z.string(),
    summary: z.string(),
    slug: z.string(),
    createdAt: z.string().regex(dateRegex),
  })
  .and(
    z
      .object({
        published: z.boolean(),
        draft: z.boolean(),
        modifiedAt: z.string().regex(dateRegex).nullable(),
        ogp: z.string(),
        tag: z.array(z.string()),
      })
      .partial()
  );
export type BlogMeta = z.infer<typeof _BlogMeta>;

export const isBlogMeta = (value: unknown): value is BlogMeta =>
  value !== undefined && value !== null && _BlogMeta.safeParse(value).success;

// BlogPost
const _BlogPost = z.object({
  data: _BlogMeta,
  content: z.string(),
});
export type BlogPost = z.infer<typeof _BlogPost>;

export const isBlogData = (value: unknown): value is BlogPost =>
  value !== undefined && value !== null && _BlogPost.safeParse(value).success;
