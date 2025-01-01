import { JSX } from "react";
import matter from "gray-matter";

export interface BaseFrontmatter {
  date: Date;
}

export interface WritingFrontmatter extends BaseFrontmatter {
  title: string;
  draft: boolean;
  tags: string[];
}

export interface Post {
  slug: string;
  content: JSX.Element;
}

export interface Writing extends Post {
  frontmatter: WritingFrontmatter;
  readingTime: number;
  hasFootnotes: boolean;
}

export interface NowPost extends Post {
  frontmatter: BaseFrontmatter;
}

export interface PostFile {
  content: string;
  data: matter.GrayMatterFile<string>["data"];
  slug: string;
}
