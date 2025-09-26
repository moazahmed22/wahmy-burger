"use client";
import { getCart } from "@/lib/cart.util";
import { CartResponse } from "@/types/cart.model";
import React, { createContext, useContext, useEffect, useState } from "react";

type CartContext = {
  cartDetails: CartResponse | null;
  getCartDetails: () => void;
};

const CartContext = createContext<CartContext>({
  cartDetails: null,
  getCartDetails: async () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartDetails, setCartDetails] = useState<CartResponse | null>(null);

  const getCartDetails = () => {
    const response = getCart();

    setCartDetails(response);
  };

  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <CartContext.Provider value={{ cartDetails, getCartDetails }}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook 'useCart'
const useCart = () => {
  const myContext = useContext(CartContext);
  return myContext;
};

export { CartProvider, useCart };
