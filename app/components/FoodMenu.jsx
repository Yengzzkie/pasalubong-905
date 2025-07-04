"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const FoodMenu = ({ items }) => {
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
    <div className="bg-[#fff] font-raleway flex flex-col items-center mb-4 px-6 lg:px-0">
      <div className="container">
        <div
          className={`flex flex-col items-center grey-bg h-full p-10 lg:p-20`}
        >
          <h1 className="divider-white white-bg great-vibes-regular text-3xl lg:text-[36px] text-center !font-normal text-zinc-600">
            Our Food Menu
          </h1>
          <p className="text-zinc-600 mt-16 text-[14px] w-full lg:w-1/2 text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim nostrud exercitation ullamco laboris nisi.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="bg-none md:bg-[url('/images/steak.png')] bg-no-repeat bg-scroll bg-left h-32 w-full custom-shadow">
          <div className="bg-none md:bg-[url('/images/tomatoes.png')] bg-no-repeat bg-scroll bg-right h-full w-full">
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
        </div>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mt-10">
        <AnimatePresence mode="wait">
          {items?.posts
            ?.filter((item) => selectedCategory === "ALL" ? true : item.category === selectedCategory)
            .map((item, index) => (
              <motion.div
                layout
                key={item.id || index}
                className="flex border h-24 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0, y: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {/* IMAGE */}
                <div className="w-1/3 h-full">
                  <img
                    src={item.image}
                    alt={item.item_name}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* CONTENT */}
                <div className="flex items-center p-4 w-full">
                  <div className="flex-3 text-left">
                    <h2 className="text-lg font-semibold text-zinc-700 hover:text-red-500 cursor-pointer">
                      {item.item_name}
                    </h2>
                    <p className="text-zinc-600 text-sm">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="mr-2">
                          {tag} /
                        </span>
                      ))}
                    </p>
                  </div>
                  <span className="flex-1 text-red-500 font-sans font-bold text-xl">
                    ${item.price}
                  </span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FoodMenu;
