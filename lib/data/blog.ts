import fs from "fs";
import path from "path";
import type { Post } from "@/types/post";

const blogPath = path.join(process.cwd(), "content", "blog.json");

function readBlogFile(): Post[] {
  const raw = fs.readFileSync(blogPath, "utf-8");
  return JSON.parse(raw) as Post[];
}

export function getPosts(): Post[] {
  return readBlogFile().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return readBlogFile().find((post) => post.slug === slug);
}

