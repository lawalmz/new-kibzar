import React from "react";
import Slider from "react-slick";

export default function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 150, // Faster transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Faster sliding interval
  };

  const slides = [
    { src: "/welcomingPoster.png", alt: "Image 1" },
    { src: "/poster1.jpeg", alt: "Image 2" },
    { src: "/poster3.jpeg", alt: "Image 4" },
   
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "380px", // Default height
        marginBottom: "30px", // Space below (if needed)
        padding: "20px", // Internal spacing (optional)
      }}
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[400px] md:h-[400px] flex items-center justify-center">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-contain" // Fit both width and height without cropping
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
