import path from "path";
import fs from "fs";
import util from "util";
import matter from "gray-matter";
import { BlogFile, BlogMeta, BlogPost, isBlogMeta } from "src/types/blog";

const readdir = util.promisify(fs.readdir);

const BLOG_PATH = path.join(process.cwd(), "contents", "blog");

//
export const getBlogFiles = async (): Promise<BlogFile[]> => {
  const dirents = await readdir(BLOG_PATH, { withFileTypes: true });
  return dirents
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".mdx"))
    .map((dirent) => ({
      name: dirent.name,
      path: `${BLOG_PATH}/${dirent.name}`,
      slug: dirent.name.replace(/\.mdx?$/, ""),
    }));
};

//
export const getBlogPost = async (
  filePath: string,
  slug: string
): Promise<BlogPost> => {
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const meta = { ...data, slug };
  if (!isBlogMeta(meta)) throw new Error(`wrong meta -> ${filePath}`);

  return {
    data: meta,
    content,
  };
};

//
export const getBlogMeta = async (
  filePath: string,
  slug: string
): Promise<BlogMeta> => {
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);

  const meta = { ...data, slug };
  if (!isBlogMeta(meta)) throw new Error(`wrong meta -> ${filePath}`);

  return meta;
};

//
export const getBlogPostWithSlug = async (slug: string): Promise<BlogPost> => {
  const filePath = `${path.join(BLOG_PATH, slug)}.mdx`;
  if (!fs.existsSync(filePath)) throw new Error(`not found blog -> ${slug}`);
  return await getBlogPost(filePath, slug);
};

//
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const blogFiles = await getBlogFiles();
  const getters = blogFiles.map((blogFile) =>
    getBlogPost(blogFile.path, blogFile.slug)
  );

  const contents = await Promise.all(getters);
  return contents.filter((cont) => cont !== null) as BlogPost[];
};

//
export const getBlogMetas = async (): Promise<BlogMeta[]> => {
  const blogFiles = await getBlogFiles();
  const getters = blogFiles.map((blogFile) =>
    getBlogMeta(blogFile.path, blogFile.slug)
  );

  const contents = await Promise.all(getters);
  return contents.filter((cont) => cont !== null) as BlogMeta[];
};
