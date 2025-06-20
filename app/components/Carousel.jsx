"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "@/app/globals.css";

export default function Carousel() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      breakpoints: {
        "(min-width: 767px)": {
          slides: { perView: 2, spacing: 12 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 10 },
        },
      },
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
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

  const slides = [
    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?q=80&w=952&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1740&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=844&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=774&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=772&auto=format&fit=crop",
  ];

  return (
    <div ref={sliderRef} className="keen-slider mt-16">
      {slides.map((src, index) => (
        <div
          key={index}
          className="keen-slider__slide flex flex-col bg-zinc-50 overflow-hidden rounded shadow"
        >
          <div className="h-64 w-full relative">
            <img src={src} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col gap-2 py-6 px-4">
            <h1 className="text-zinc-600 font-bold text-center text-2xl">
              Dish name here
            </h1>
            <p className="text-[#e54c2a] font-bold text-2xl text-center">
              $10.99
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
