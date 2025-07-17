"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OtherProductsCard from "./OtherProductsCard";

const OtherProducts = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const foodCategories = [
    "ALL",
    "PORK",
    "BEEF",
    "CHICKEN",
    "SEAFOOD",
    "VEGETABLE",
    "DESSERT",
    "DRINKS",
  ];

  return (
    <div className="bg-[#f1f1f1] font-raleway md:bg-[url('/images/bg-3.png')] bg-no-repeat bg-scroll bg-left-top flex flex-col items-center mb-4 px-6 pb-15">
      <div className="flex flex-col items-center bg-[url('/images/bg-4.png')] bg-no-repeat bg-scroll bg-right-bottom w-full">
        <div className="container">
          <div
            className={`flex flex-col items-center grey-bg h-full p-10 lg:p-20`}
          >
            <h1 className="divider-grey white-bg great-vibes-regular text-3xl lg:text-[36px] text-center !font-normal text-zinc-600">
              Other Products
            </h1>
            <p className="text-zinc-600 mt-16 text-[14px] w-full lg:w-1/2 text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim nostrud exercitation ullamco laboris nisi.
            </p>
          </div>

          {/* NAVIGATION */}
          {/* <div className="h-32 custom-shadow">
            <div className="h-full w-full">
              <div className="flex items-center justify-center h-full">
                <ul className="flex flex-wrap justify-center gap-4 px-6 lg:px-0">
                  {foodCategories.map((category, index) => (
                    <li
                      key={index}
                      className={`text-[14px] font-semibold font-raleway cursor-pointer transition-colors ${
                        selectedCategory === category
                          ? "text-red-500 underline"
                          : "text-zinc-600 hover:text-red-500"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}
        </div>
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-10">
          <AnimatePresence mode="wait">
            {items?.posts
              ?.filter((item) => item.isOtherProduct)
              .map((item, index) => (
                <motion.div
                  layout
                  key={item.id || index}
                  className="flex border h-60 overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {/* IMAGE */}
                  <OtherProductsCard item={item} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OtherProducts;
