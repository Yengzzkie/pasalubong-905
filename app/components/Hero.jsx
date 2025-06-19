"use client";

import { FlipWords } from "./ui/flip-words";
import HeroBackground from "@/public/images/hero-bg.jpg";
import { Button } from "@material-tailwind/react";

export default function Hero() {
  const words = ["Quality", "Authentic", "Tasty"];

  return (
    <div
      className="relative mx-auto mt-4 flex flex-col items-center justify-center w-full min-h-[500px]"
      style={{
        backgroundImage: `url(${HeroBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`flex flex-col items-center gap-2 px-6 pt-4 bg-opacity-50 p-8 text-center`}>
        <h1 className={`great-vibes-regular !font-semibold text-[36px] text-zinc-600`}>
          Welcome to Pasalubong 905
        </h1>
        <p className="font-raleway font-bold text-2xl lg:text-5xl uppercase text-zinc-600">
          Loves <FlipWords className="text-[#e54c2a]" words={words} />
          Food
        </p>
        <p className="text-zinc-600 text-xs lg:text-[14px] text-wrap leading-[24px] w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          vel volutpat felis, eu condimentum. lorem ipsum dolor. lorem ipsum
          dolor sit amt.
        </p>
        <Button className="bg-[#e54c2a] my-2 rounded-none hover:bg-zinc-600 transition-all">Order Now</Button>
      </div>
    </div>
  );
}