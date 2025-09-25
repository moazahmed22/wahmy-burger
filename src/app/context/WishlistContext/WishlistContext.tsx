"use client";
import { getWishlist } from "@/lib/wishlist.util";
import { Product } from "@/types/product.model";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

type WishlistContext = {
  wishlistProducts: Product[] | null;
  getWishlistDetails: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContext>({
  wishlistProducts: null,
  getWishlistDetails: async () => {},
});

const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[] | null>(
    null
  );

  const getWishlistDetails = async () => {
    const response = await getWishlist();
    setWishlistProducts(response);
  };
  useEffect(() => {
    getWishlistDetails();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistProducts, getWishlistDetails }}>
      {children}
    </WishlistContext.Provider>
  );
};
const useWishlist = () => {
  const context = useContext(WishlistContext);
  return context;
};

export { WishlistProvider, useWishlist };
