"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import ProductsShoppingSection from "../ShoppingSectionComp/ProductsShoppingSectionComp";
import { Product } from "@/types/product.model";
import { Category } from "@/types/category.model";
import { CategoryFilterContext } from "@/app/CategoryFilter-provider";
// import { useCart } from "@/app/context/CartContext/CartContext";

const ProductsPage = ({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) => {
  const context = useContext(CategoryFilterContext);
  if (!context) {
    throw new Error("useContext must be used inside CategoryFilterProvider");
  }
  const { activeCategory, setActiveCategory } = context;
  const [filteredItems, setFilteredItems] = useState<Product[]>(products);
  useEffect(() => {
    // reset filteredItems
    setActiveCategory(null);
  }, []);
  useMemo(() => {
    // reset filteredItems
    setFilteredItems([...products]);
    //   // Filter by selected category first
    if (activeCategory) {
      setFilteredItems(
        products.filter((product) => product?.category?.name === activeCategory)
      );
    }
  }, [activeCategory]);
  return (
    <>
      <ProductsShoppingSection
        sectionTitle="products"
        sectionData={filteredItems}
        viewAll={false}
        filter={categories}
      />
    </>
  );
};

export default ProductsPage;
