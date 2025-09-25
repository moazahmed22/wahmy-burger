import React from "react";
import { Product } from "@/types/product.model";
// import all products
import products from "@/../public/data/wahmy-products.json";
import categories from "@/../public/data/wahmy-categories.json";
import { Category } from "@/types/category.model";
import ShopSingleCategoryComp from "@/components/ShopSingleCategoryComp/ShopSingleCategoryComp";

const shopByCategory = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const category = categories.find((category: Category) => category._id === id);
  //   products by category
  const productsByCategory = products.filter(
    (product: Product) => product.category.slug === category?.slug
  );
  return category ? (
    <div className="h-fit container mx-auto px-1 md:px-0">
      <ShopSingleCategoryComp
        products={productsByCategory}
        category={category.name}
      />
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default shopByCategory;
