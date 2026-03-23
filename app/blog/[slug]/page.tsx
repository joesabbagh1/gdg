import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPosts, getPostBySlug } from "@/lib/data/blog";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description =
    post.excerpt && post.excerpt.trim().length > 0
      ? post.excerpt
      : post.content.length > 180
        ? `${post.content.slice(0, 177)}...`
        : post.content;

  const image = "/logo_name.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Affichage simple du contenu avec sauts de lignes.
  const paragraphs = post.content.split("\n\n");

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 py-24 flex-1">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            {post.date}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border/60 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            {paragraphs.map((para, index) => (
              <p key={index} className="mb-4">
                {para}
              </p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

