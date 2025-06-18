"use client";
import { usePostSearchResult, useSearchQuery } from "@/stores/store";
import PostCard from "../components/PostCard";
import Link from "next/link";

const page = () => {
  const { postSearchResult } = usePostSearchResult();
  const { searchQuery } = useSearchQuery();

  return (
    <div className="flex flex-col">
      <h1 className="text-xl lg:text-4xl font-bold my-3 mx-1 lg:mx-0">
        Showing {postSearchResult?.posts?.length || 0} results for "{searchQuery}"
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4">
        {postSearchResult?.posts?.map((post) => (
          <Link href={`/item-details/${post.id}`} key={post._id}>
            <PostCard data={post} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
