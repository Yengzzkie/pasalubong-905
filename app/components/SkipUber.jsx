"use client";
import Link from "next/link";
import uberEats from "@/public/images/ubereats.png";
import skipTheDishes from "@/public/images/skipthedishes.png";

const boxesData = [
  {
    icon: uberEats.src,
    title: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, inventore? sit amet consectetur adipisicing elit",
    link: "https://www.ubereats.com/ca/store/pasalubong-905/qrJQk32dS7GtkBSoQ8LtUQ?srsltid=AfmBOoq2qukY3zGHIt7OesEpE6ECKvgh4OKUZGsG4O5Ftxm3LV60hALk",
  },
  {
    icon: skipTheDishes.src,
    title: "Lorem ipsum dolor sit amet.",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, inventore? sit amet consectetur adipisicing elit",
    link: "https://www.skipthedishes.com/pasalubong-bond",
  },
];

export default function SkipUber() {
  return (
    <div className="text-black lg:flex-row items-center justify-center h-full w-screen px-8 lg:px-32 lg:mb-0 pb-8">
      <div className={`flex flex-col items-center grey-bg h-full p-10 lg:p-20`}>
        <h1 className="divider-white white-bg great-vibes-regular text-3xl lg:text-[36px] text-center !font-normal text-zinc-600">
          Find us on Uber Eats and Skip the Dishes
        </h1>
        <p className="text-zinc-600 mt-16 text-[14px] w-full lg:w-1/2 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim nostrud exercitation ullamco laboris nisi.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 justify-evenly">
        {boxesData.map((data, index) => (
          <div
            key={index}
            className="flex hover:bg-yellow-200/80 items-center justify-center gap-2 p-4 shadow-sm border w-full h-[300px]"
          >
            <Link href={data.link} target="_blank">
              <img src={data.icon} className="h-auto w-full" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
