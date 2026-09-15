"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export interface PublicBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  isFeatured: boolean;
  publishedAt?: Date | string | null;
  category?: { id: string; name: string } | null;
}

interface PublicBlogClientProps {
  initialPosts: PublicBlogPost[];
  categories: { id: string; name: string }[];
}

export function PublicBlogClient({ initialPosts, categories }: PublicBlogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category?.name === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((p) => p.isFeatured);
  const regularPosts = filteredPosts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "All"
                ? "bg-[#DF1B25] text-white border-transparent"
                : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant="outline"
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.name
                  ? "bg-[#DF1B25] text-white border-transparent"
                  : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
              }`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border text-foreground rounded-full focus-visible:ring-[#DF1B25]"
          />
        </div>
      </div>

      {featuredPost && (
        <Link href={`/blog/${featuredPost.slug}`} className="block group">
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card flex flex-col md:flex-row h-auto md:h-[400px]">
            <div className="w-full md:w-1/2 relative h-[250px] md:h-full">
              {featuredPost.featuredImage ? (
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent md:hidden" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-3 mb-4">
                {featuredPost.category && (
                  <span className="text-[#DF1B25] text-sm font-bold tracking-wider uppercase">
                    {featuredPost.category.name}
                  </span>
                )}
                <span className="text-muted-foreground text-sm">
                  {featuredPost.publishedAt ? format(new Date(featuredPost.publishedAt), "MMM d, yyyy") : ""}
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4 group-hover:text-[#DF1B25] transition-colors">
                {featuredPost.title}
              </h3>
              {featuredPost.excerpt && (
                <p className="text-muted-foreground text-lg line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              )}
            </div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border mb-6 bg-card">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 mb-3">
              {post.category && (
                <span className="text-[#DF1B25] text-xs font-bold tracking-wider uppercase">
                  {post.category.name}
                </span>
              )}
              <span className="text-muted-foreground text-xs">
                {post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : ""}
              </span>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#DF1B25] transition-colors line-clamp-2">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="text-muted-foreground text-sm line-clamp-3 mt-auto">
                {post.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-24 text-muted-foreground">
          <p className="text-lg">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
