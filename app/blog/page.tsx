import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPosts } from "@/lib/data/blog";

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted/20">
      <Navbar />

      <main className="container mx-auto px-4 py-24 flex-1">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Blog du GDG EPITA
          </h1>
          <p className="text-lg text-muted-foreground">
            Articles et retours d&apos;expérience sur les technologies Google et la vie du club.
          </p>
        </div>

        <section className="mx-auto max-w-3xl space-y-4">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl border border-border/60 bg-background/70 px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {post.date}
              </p>
              <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-[#4285F4] hover:text-[#0F9D58] transition-colors"
              >
                Lire l&apos;article →
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Aucun article publié pour le moment.
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

