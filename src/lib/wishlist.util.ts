// utils/wishlist.utils.ts
import { Product } from "@/types/product.model";
import toast from "react-hot-toast";

const WISHLIST_KEY = "wishlist";

// ✅ Get wishlist from localStorage
export function getWishlist(): Product[] {
  if (typeof window === "undefined") return []; // SSR safety
  const wishlist = localStorage.getItem(WISHLIST_KEY);
  return wishlist ? JSON.parse(wishlist) : [];
}

// ✅ Save wishlist to localStorage
function saveWishlist(wishlist: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

// ✅ Add item to wishlist
export function addToWishlist(item: Product) {
  const wishlist = getWishlist();
  if (!wishlist.some((i) => i._id === item._id)) {
    wishlist.push(item);
    saveWishlist(wishlist);
  } else {
    toast.error("Item already in wishlist");
  }
  return wishlist;
}

// ✅ Remove item
export function removeFromWishlist(id: string) {
  const wishlist = getWishlist().filter((i) => i._id !== id);
  saveWishlist(wishlist);
  return wishlist;
}
