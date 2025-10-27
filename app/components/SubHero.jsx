"use client";
import { Button } from "@material-tailwind/react";
import Pasalogo from "@/public/images/pasalogo.png";

const SubHero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center p-12 lg:px-40">
      <div className="flex flex-col flex-1 gap-2 font-lato text-zinc-600 leading-[24px]">
        <h1 className="great-vibes-regular text-3xl">About Pasalubong 905</h1>
        <p className="font-semibold">
          Pasalubong 905 brings the authentic taste of Filipino home cooking to the heart of Oshawa.
        </p>
        <p className="text-[14px]">
          We’re a family-owned restaurant passionate about serving dishes that remind you of home- from your favorite silog meals to classic filipino street food.
          Every bite is made with love, warmth, and the spirit of Filipino hospitality.
        </p>
        <p className="text-[14px]">
          Our goal is to bring kababayans together through food - whether you’re craving a hearty breakfast, a comforting merienda, or a feast to share with family & friends.
        </p>
        <p className="text-[14px] font-semibold">
          Come dine in with us or take home a taste of the Philippines today.
        </p>
        <Button className="bg-[#e54c2a] my-2 w-fit rounded-none hover:bg-zinc-600 transition-all py-3 px-4">Read More</Button>
      </div>
      <div className="flex-1">
        <img src={Pasalogo.src} className="w-[75%] mx-auto" />
      </div>
    </div>
  );
};

export default SubHero;

// pasalubong 905 Brings the authentic taste of filipino home cooking to the heart of oshawa. We’re a family-owned restaurant passionate about serving dishes that remind you of home- from your favorite silog meals to classic filipino street food.
// Every bite is made with love, warmth, and the spirit of filipino hospitality.
// Our goal is to bring kababayans together through food - whether you’re craving a hearty breakfast, a comforting merienda, or a feast to share with family & friends.
// Come dine in with us or take home a taste of the philippines today.