"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "./components/Navigation";
import Hero from "@/app/components/Hero";
import SubHero from "./components/SubHero";
import Featured from "./components/Featured";
import FoodMenu from "./components/FoodMenu";
import OtherProducts from "./components/OtherProducts";
import SkipUber from "./components/SkipUber";
import Footer from "./components/Footer";

export default function Home() {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const response = await axios.get('/api/posts?page=1')
      setItems(response.data)
    } catch (error) {
      console.error({ error })
    }
  }

  useEffect(() => {
    fetchItems();
  }, [])

  return (
    <div className="flex-1 flex flex-col">
      <Navigation />
      <Hero />
      <SubHero />
      <Featured items={items} />
      <FoodMenu items={items} />
      <OtherProducts items={items} />
      <SkipUber />
      <Footer />
    </div>
  );
}
