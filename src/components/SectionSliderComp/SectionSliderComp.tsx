"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Category } from "@/types/category.model";
import { ShoppingSectionItem } from "../ShoppingSectionComp/ShoppingSectionComp";

const SectionSlider = ({
  sectionTitle,
  sectionData,
}: {
  sectionTitle: string;
  sectionData: Category[];
}) => {
  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={115}
        modules={[Pagination]}
        className="mySwiper mt-12"
      >
        {/* map the sectionData from ShoppingSection */}
        {sectionData?.map((item, index) => (
          <SwiperSlide key={index} className="max-w-fit">
            <ShoppingSectionItem sectionTitle={sectionTitle} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SectionSlider;
