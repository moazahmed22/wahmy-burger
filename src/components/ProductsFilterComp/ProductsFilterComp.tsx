"use client";
import React, { useContext } from "react";
import { Category } from "@/types/category.model";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
import { ChevronDown } from "lucide-react";
import { CategoryFilterContext } from "@/app/CategoryFilter-provider";

const ProductsFilter = ({ categories }: { categories: Category[] }) => {
  const context = useContext(CategoryFilterContext);

  if (!context) {
    throw new Error("useContext must be used inside CategoryFilterProvider");
  }

  const { activeCategory, setActiveCategory } = context;

  const handleFilter = (name: string) => {
    setActiveCategory(name);
  };

  return (
    <>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={20}
        modules={[Pagination]}
        className="mySwiper mt-3"
      >
        <SwiperSlide className="max-w-fit">
          <div
            className={`${
              activeCategory === null
                ? "bg-primary text-background"
                : "text-foreground bg-primary/15"
            } flex items-center  px-4 py-2 rounded-full cursor-pointer`}
            onClick={() => setActiveCategory(null)}
          >
            All
            <ChevronDown />
          </div>
        </SwiperSlide>
        {/* map the sectionData from ShoppingSection */}
        {categories?.map((category) => (
          <SwiperSlide key={category._id} className="max-w-fit">
            <div
              className={`${
                activeCategory === category.name
                  ? "bg-primary text-background"
                  : "text-foreground bg-primary/15"
              } flex items-center  px-4 py-2 rounded-full cursor-pointer`}
              onClick={() => handleFilter(category.name)}
            >
              {category?.name}
              <ChevronDown />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductsFilter;
