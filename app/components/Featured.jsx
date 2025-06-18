"use client";
import Background1 from "@/public/images/bg-1.png";
import Background2 from "@/public/images/bg-2.png";
import Carousel from "./Carousel";

const Featured = () => {
  return (
    <div
      className="bg-[#f1f1f1] bg-no-repeat bg-scroll bg-left-bottom"
      style={{
        backgroundImage: `url(${Background1.src})`,
      }}
    >
      <div
        className="flex flex-col items-center bg-no-repeat grey-bg bg-scroll bg-right-top h-full p-20"
        style={{
          backgroundImage: `url(${Background2.src})`,
        }}
      >
        <h1 className="divider great-vibes-regular text-[36px] text-center !font-semibold text-zinc-600">Our Popular Dishes</h1>
        <p className="text-zinc-600 mt-16 w-1/2 text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim nostrud exercitation ullamco laboris nisi.</p>
        <Carousel />
      </div>
    </div>
  );
};

export default Featured;
