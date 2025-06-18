"use client"
import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "@/app/globals.css"

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

export default function Carousel({ itemData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )


  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {itemData.map((image, index) => (
          <div key={index} className="keen-slider__slide ">
            <img loading="lazy" onClick={() => {
              setIsOpen(true);
              setSelectedImage(image);
            }} src={image} alt="" />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {itemData.map((image, index) => (
          <div key={index} className="keen-slider__slide "><div className="overlay"></div><img src={image} alt="" /></div>
        ))}
      </div>
    </>
  )
}