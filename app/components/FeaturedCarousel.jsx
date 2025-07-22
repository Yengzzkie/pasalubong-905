"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CardLoader from "./ui/CardLoader";

function FeaturedCarousel({ items }) {
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-next`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-prev`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => <div className="custom-dot">{i + 1}</div>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  if (!items || items.length === 0) {
    return (
      <div className="slider-container">
        <Slider {...settings}>
          <CardLoader />
        </Slider>
      </div>
    );
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {items?.posts?.filter((item) => item.isFeatured).map((item, index) => (
          <div className="px-4 mb-4" key={index}>
            <div className="flex flex-col bg-zinc-50 overflow-hidden rounded shadow">
              <div className="h-64 w-full relative">
                <img
                  src={item.image?.[0]}
                  alt={item.item_name || `Item ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-2 py-6 px-4">
                <h2 className="text-zinc-600 font-raleway font-semibold text-center text-2xl">
                  {item.item_name}
                </h2>
                <p className="text-[#e54c2a] font-bold text-2xl text-center">
                  ${item.price || "10.99"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default FeaturedCarousel;
