"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import Image from "next/image";

const MainSlider = () => {
  const images = [
    "/mainSliderSlides/slide1.jpg",
    "/mainSliderSlides/slide2.jpg",
    "/mainSliderSlides/slide3.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    // when componenet dismount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [nextSlide]);

  return (
    <>
      <div className="w-full min-h-[300px] relative z-0 flex justify-center bg-accent">
        <Image
          className="rounded-2xl object-center object-contain"
          src={images[currentIndex]}
          alt="images"
          fill
          priority
        />
        {/* Left Arrow */}
        <div
          onClick={prevSlide}
          className="h-16 w-16 flex justify-center items-center text-primary bg-accent shadow-[0_0_0_10px_#fff] rounded-full absolute top-[50%] left-0 md:translate-x-[-50%] translate-y-[-50%] text-2xl p-2 cursor-pointer"
        >
          <ChevronLeft />
        </div>
        {/* Right Arrow */}
        <div
          onClick={nextSlide}
          className="h-16 w-16 flex justify-center items-center text-primary bg-accent shadow-[0_0_0_10px_#fff] rounded-full absolute top-[50%] right-0 md:translate-x-[50%] translate-y-[-50%] text-2xl p-2 cursor-pointer"
        >
          <ChevronRight />
        </div>
      </div>
    </>
  );
};

export default MainSlider;
