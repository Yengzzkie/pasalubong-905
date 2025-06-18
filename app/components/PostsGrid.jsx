"use client";

import { useEffect, useState } from "react";
import { DragCloseDrawerExample } from "./Drawer";
import Pagination from "@mui/material/Pagination";
import CardLoader from "./ui/CardLoader";
import PostCard from "./PostCard";
import axios from "axios";

const PostsGrid = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  async function fetchPosts() {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/posts?page=${page}`);
      setItems(response.data?.posts);
      setTotalPage(response?.data?.total_page);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [page]);

  function handleOpenDrawer(item) {
    setSelectedPost(item);
    setOpenDrawer(true);
  }

  return (
    <div className="my-10 lg:px-0 px-1 w-full">
      <h1 className="text-xl lg:text-4xl font-bold my-3 mx-1 lg:mx-0">
        Fresh Finds
      </h1>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:gap-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <CardLoader />
                </div>
              ))
            : items
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenDrawer(item)}
                    className="cursor-pointer"
                  >
                    <PostCard fetchPosts={fetchPosts} data={item} />
                  </div>
                ))}
        </div>

        <DragCloseDrawerExample
          selectedPost={selectedPost}
          open={openDrawer}
          setOpen={setOpenDrawer}
        />

        <Pagination
          count={totalPage}
          color="secondary"
          onChange={(event, value) => setPage(value)}
          sx={{ margin: "32px auto" }}
        />
      </div>
    </div>
  );
};

export default PostsGrid;
