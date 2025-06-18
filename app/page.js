"use client";
import PostsGrid from "@/app/components/PostsGrid";
import Hero from "@/app/components/Hero";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen flex flex-col">
      <Hero />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsGrid />
      </main>
    </div>
  );
}
