import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { GetStaticProps } from "next";
import MDXComponents from "src/components/MDXComponents";
import { getBlogFiles, getBlogPostWithSlug } from "src/lib/blog/getBlogPosts";
import { isArray } from "lodash";
import BlogLayout from "src/layouts/blog";
import { BlogMeta } from "src/types/blog";
import React from "react";

const mdxPrism = require("mdx-prism");

type staticProps = {
  source: MDXRemoteSerializeResult;
  meta: BlogMeta;
};

const Blog: React.FC<staticProps> = ({ source, meta }) => {
  return (
    <BlogLayout meta={meta}>
      <MDXRemote {...source} components={MDXComponents} />
    </BlogLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;
  if (!slug) throw new Error(`undefined slug`);
  if (isArray(slug)) throw new Error(`slug is array`);

  const { content, data } = await getBlogPostWithSlug(slug);

  const mdxSource = await serialize(content, {
    scope: data,
    mdxOptions: {
      remarkPlugins: [
        require("remark-autolink-headings"),
        require("remark-slug"),
        require("remark-code-titles"),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    props: {
      source: mdxSource,
      meta: data,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const blogFiles = await getBlogFiles();
  const paths = blogFiles.map((blogFile) => ({
    params: { slug: blogFile.slug },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export default Blog;
