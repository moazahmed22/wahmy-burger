"use client";
import { Product } from "@/types/product.model";
import React from "react";
import ProductsShoppingSection from "../ShoppingSectionComp/ProductsShoppingSectionComp";

const ShopSingleCategoryComp = ({
  products,
  category,
}: {
  products: Product[];
  category: string;
}) => {
  return (
    <>
      <section
        id="products-section"
        className="container mx-auto scroll-mt-[104px] px-1 my-20 md:px-0"
      >
        <ProductsShoppingSection
          sectionTitle={category}
          sectionData={products}
          viewAll={false}
        />
      </section>
    </>
  );
};

export default ShopSingleCategoryComp;
