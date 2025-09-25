// utils/cart.utils.ts

import { CartResponse } from "@/types/cart.model";
import { Product } from "@/types/product.model";
import { use, useState } from "react";
import { number } from "zod";

const CART_KEY = "cart";

// ✅ Get cart from localStorage
export function getCart(): CartResponse | null {
  if (typeof window === "undefined") return null; // SSR safety
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : null;
}

// ✅ Save cart to localStorage
function saveCart(cart: CartResponse) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// ✅ Add item to cart
export function addToCart(product: Product) {
  const cart = getCart();
  if (cart) {
    const existingIndex = cart?.data.products.findIndex(
      (i) => i._id === product._id
    );
    if (existingIndex > -1) {
      cart.data.products[existingIndex].count++;
    } else {
      cart.data.products.push({
        count: 1,
        _id: product._id,
        product,
        price: product.price,
      });
      // calculate total price
      let total = 0;
      for (let index = 0; index < cart.data.products.length; index++) {
        total =
          total +
          cart.data.products[index].count * cart.data.products[index].price;
      }
      cart.data.totalCartPrice = total;
    }
    saveCart(cart);
    return cart;
  } else {
    const cartId = `${Math.floor(Math.random() * 1000)}`;
    const newCart: CartResponse = {
      numOfCartItems: 1,
      cartId: cartId,
      data: {
        _id: cartId,
        cartOwner: `new user`,
        products: [
          {
            count: 1,
            _id: product._id,
            product: product,
            price: product.price,
          },
        ],
        totalCartPrice: product.price,
      },
    };
    saveCart(newCart);
    return { cart: newCart, message: "new cart created" };
  }
}

// ✅ Remove item
export function removeFromCart(id: string) {
  const cart = getCart();
  if (!cart) {
    return null;
  } else {
    let cartProducts = cart?.data.products;
    cartProducts = cartProducts.filter((i) => i._id !== id);
    cart.data.products = [...cartProducts];
    cart.numOfCartItems = cart.data.products.length;
    // calculate total price
    let total = 0;
    for (let index = 0; index < cart.data.products.length; index++) {
      total =
        total +
        cart.data.products[index].count * cart.data.products[index].price;
    }
    cart.data.totalCartPrice = total;
    saveCart(cart);
    return cart;
  }
}

// ✅ update item
export function updateProductQuantity(productId: string, count: number) {
  const cart = getCart();
  if (cart) {
    const existingIndex = cart?.data.products.findIndex(
      (i) => i._id === productId
    );
    if (existingIndex > -1) {
      if (count === 0) return removeFromCart(productId);
      cart.data.products[existingIndex].count = count;
      // calculate total price
      let total = 0;
      for (let index = 0; index < cart.data.products.length; index++) {
        total =
          total +
          cart.data.products[index].count * cart.data.products[index].price;
      }
      cart.data.totalCartPrice = total;
      saveCart(cart);
      return cart;
    } else {
      console.log("Product not found in cart");
    }
  } else {
    return { message: "Cart not found" };
  }
}
