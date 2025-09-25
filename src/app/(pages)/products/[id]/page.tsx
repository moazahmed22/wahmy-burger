import React from "react";
import SingleProductComp from "@/components/SingleProductComp/SingleProductComp";
import { Product } from "@/types/product.model";
// import all products
import products from "@/../public/data/wahmy-products.json";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = products.find((product: Product) => product.id === id);

  return product ? (
    <div className="h-fit container mx-auto px-1 md:px-0">
      <SingleProductComp product={product} />
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default ProductDetails;
