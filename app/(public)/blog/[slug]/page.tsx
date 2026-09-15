import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";
import { Metadata } from "next";
import { BlogInteractions } from "@/features/blog/components/blog-interactions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: true, category: true },
  });

  if (!post) {
    return {
      title: "Not Found",
    };
  }

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: post.author?.name ? [post.author.name] : [],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
    },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  // Fetch related posts (same category)
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      id: { not: post.id },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { category: true },
  });

  // Fetch all tags for the sidebar
  const tags = await prisma.blogTag.findMany({
    orderBy: { name: "asc" },
  });

  const articleSchema = buildArticleSchema({
    headline: post.title,
    description: post.metaDescription || post.excerpt || "",
    image: post.featuredImage,
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    authorName: post.author?.name || "Design Hub One Team",
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: buildAbsoluteUrl("/") },
    { name: "Blog", url: buildAbsoluteUrl("/blog") },
    { name: post.title, url: buildAbsoluteUrl(`/blog/${post.slug}`) },
  ]);

  return (
    <main className="flex-1 w-full bg-background text-foreground min-h-screen">
      <StructuredData id="article-schema" schema={articleSchema} />
      <StructuredData id="breadcrumb-schema" schema={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border bg-muted/30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#DF1B25]/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-6">
            {post.category && (
              <span className="text-[#DF1B25] text-sm font-bold tracking-wider uppercase bg-[#DF1B25]/10 px-3 py-1 rounded-full">
                {post.category.name}
              </span>
            )}
            <span className="text-muted-foreground text-sm flex items-center">
              {post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : ""}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-t border-border pt-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border border-border">
                <span className="text-foreground font-bold text-sm">
                  {post.author?.name ? post.author.name.charAt(0).toUpperCase() : "D"}
                </span>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">{post.author?.name || "Design Hub One Team"}</p>
                <p className="text-muted-foreground text-xs">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Article Content */}
            <article className="flex-1 w-full max-w-3xl mx-auto lg:mx-0">
              {post.featuredImage && (
                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-border mb-12 shadow-xl">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-p:leading-relaxed dark:prose-p:text-slate-300 dark:prose-headings:text-white prose-headings:font-bold prose-a:text-[#DF1B25] hover:prose-a:text-[#DF1B25]/80 dark:prose-strong:text-white prose-blockquote:border-[#DF1B25] dark:prose-blockquote:bg-muted/40 prose-blockquote:bg-muted/60 prose-blockquote:p-4 prose-blockquote:rounded-r-xl prose-img:rounded-2xl dark:prose-pre:bg-[#101735] prose-pre:bg-slate-900 prose-pre:border dark:prose-pre:border-border"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-16 pt-8 border-t border-border flex flex-col justify-between items-center gap-6">
                <BlogInteractions url={buildAbsoluteUrl(`/blog/${post.slug}`)} title={post.title} />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-[350px] shrink-0 space-y-12">
              <div className="sticky top-24 space-y-12">
                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#DF1B25] rounded-full inline-block" />
                      Related Articles
                    </h3>
                    <div className="space-y-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-4 items-center">
                            {relatedPost.featuredImage && (
                              <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-border shrink-0">
                                <Image
                                  src={relatedPost.featuredImage}
                                  alt={relatedPost.title}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div>
                              <h4 className="text-foreground font-medium text-sm line-clamp-2 group-hover:text-[#DF1B25] transition-colors">
                                {relatedPost.title}
                              </h4>
                              <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                                {relatedPost.publishedAt ? format(new Date(relatedPost.publishedAt), "MMM d, yyyy") : ""}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Tags */}
                {tags.length > 0 && (
                  <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#DF1B25] rounded-full inline-block" />
                      Popular Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag.id} className="bg-muted text-muted-foreground hover:text-foreground text-sm px-3 py-1.5 rounded-full transition-colors cursor-default border border-transparent hover:border-border">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter CTA */}
                <div className="bg-gradient-to-br from-[#DF1B25]/10 to-card border border-border rounded-3xl p-8 shadow-sm text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3">Stay Updated</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Get the latest insights on design and architecture delivered to your inbox.
                  </p>
                  <form className="space-y-3" action={async () => { "use server"; }}>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#DF1B25] focus:ring-1 focus:ring-[#DF1B25]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl px-4 py-3 text-sm font-bold shadow-lg shadow-[#DF1B25]/20 transition-all active:scale-95"
                    >
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
