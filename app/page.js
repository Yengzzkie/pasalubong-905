"use client";
import PostsGrid from "@/app/components/PostsGrid";
import Hero from "@/app/components/Hero";
import SubHero from "./components/SubHero";
import Featured from "./components/Featured";
import FoodMenu from "./components/FoodMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import OtherProducts from "./components/OtherProducts";

export default function Home() {
  const [items, setItems] = useState([]);

  async function fetchFeaturedItems() {
    try {
      const response = await axios.get('/api/posts?page=1')
      console.log(response.data)
      setItems(response.data)
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    fetchFeaturedItems();
  }, [])

  return (
    <div className="flex-1 min-h-screen flex flex-col">
      <Hero />
      <SubHero />
      <Featured items={items} />
      <FoodMenu items={items} />
      <OtherProducts items={items} />
      
      {/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PostsGrid />
      </main> */}
    </div>
  );
}
