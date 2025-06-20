"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "@/app/globals.css";

export default function Carousel({ items }) {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 767px)": {
          slides: { perView: 2, spacing: 12 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 15 },
        },
      },
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;

        const clearNextTimeout = () => clearTimeout(timeout);

        const nextTimeout = () => {
          clearTimeout(timeout);
          if (!mouseOver) {
            timeout = setTimeout(() => slider.next(), 2500);
          }
        };

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className="keen-slider mt-16">
      {items?.posts?.map((item, index) => (
        <div
          key={index}
          className="keen-slider__slide flex flex-col bg-zinc-50 overflow-hidden rounded shadow"
        >
          <div className="h-64 w-full relative">
            <img
              src={item.image?.[0]}
              alt={item.item_name || `Item ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-2 py-6 px-4">
            <h2 className="text-zinc-600 font-bold text-center text-2xl">
              {item.item_name}
            </h2>
            <p className="text-[#e54c2a] font-bold text-2xl text-center">
              ${item.price || "10.99"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
