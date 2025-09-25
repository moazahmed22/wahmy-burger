import ProductsPage from "@/components/ProductsPage/ProductsPage";
import React from "react";
// import data
import categories from "@/../public/data/wahmy-categories.json";
import products from "@/../public/data/wahmy-products.json";

const Products = async () => {
  return (
    <>
      <section
        id="products-section"
        className="container mx-auto scroll-mt-[104px] px-1 md:px-0"
      >
        <ProductsPage products={products} categories={categories} />
      </section>
    </>
  );
};

export default Products;
