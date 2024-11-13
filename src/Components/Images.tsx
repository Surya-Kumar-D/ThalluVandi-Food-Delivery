import React, { useState, useEffect } from "react";

function Images() {
  const images = [
    "/img/gravy.jpg",
    "/img/parotta-max.jpg",
    "/img/sambar-rice-max.jpg",
    "/img/rasam-max.webp",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const img = document.getElementById("img");
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      img.classList.remove(".ani");
      void img.offsetWidth;
      img.classList.add(".ani");
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-[700px]  w-full overflow-hidden flex justify-center items-center">
      {images.map((src, index) => (
        <img
          id="img"
          key={index}
          src={src}
          alt={`carousel ${index}`}
          className={`absolute w-full h-full transition-transform object-cover  duration-1000 ${
            index === currentIndex ? "opacity-100 ani" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default Images;
