"use client";
import Carousel from "./Carousel";

const Featured = ({ items }) => {
  return (
    <div className="bg-[#f1f1f1] bg-[url('/images/bg-1.png')] bg-no-repeat bg-scroll bg-left-bottom">
      <div
        className={`flex flex-col items-center bg-no-repeat grey-bg bg-scroll bg-right-top bg-none lg:bg-[url('/images/bg-2.png')] h-full p-10 lg:p-20`}
      >
        <h1 className="divider great-vibes-regular text-3xl lg:text-[36px] text-center !font-semibold text-zinc-600">
          Our Popular Dishes
        </h1>
        <p className="font-raleway text-zinc-600 mt-16 text-[14px] w-full lg:w-1/2 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim nostrud exercitation ullamco laboris nisi.
        </p>
        <Carousel items={items} />
      </div>
    </div>
  );
};

export default Featured;
