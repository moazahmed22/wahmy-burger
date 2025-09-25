"use client";
import { useWishlist } from "@/app/context/WishlistContext/WishlistContext";
import ProductsShoppingSection from "@/components/ShoppingSectionComp/ProductsShoppingSectionComp";
import React, { useEffect } from "react";

const Wishlist = () => {
  const { wishlistProducts, getWishlistDetails } = useWishlist();

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <>
      <section
        id="products-section"
        className="container mx-auto scroll-mt-[104px] px-1 my-20 md:px-0"
      >
        <ProductsShoppingSection
          sectionTitle="wishlist"
          sectionData={wishlistProducts!}
          viewAll={false}
        />
      </section>
    </>
  );
};

export default Wishlist;
