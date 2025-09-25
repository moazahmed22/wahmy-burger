"use client";
import { Product } from "@/types/product.model";
import { ChevronRight, Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { StarRating } from "react-flexible-star-rating";
import ProductsFilter from "../ProductsFilterComp/ProductsFilterComp";
import { Category } from "@/types/category.model";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartContext/CartContext";
import { useWishlist } from "@/app/context/WishlistContext/WishlistContext";
import { addToCart } from "@/lib/cart.util";
import { addToWishlist, removeFromWishlist } from "@/lib/wishlist.util";
import { useSession } from "next-auth/react";

const ProductsShoppingSectionItem = ({
  item,
  sessionData,
}: {
  item: Product;
  sessionData: unknown;
}) => {
  // handle wishtliste
  // 1. get all wishlist
  const { wishlistProducts, getWishlistDetails } = useWishlist();
  // 2. handle add to wishlist
  const handleAddToWishlist = async (product: Product) => {
    if (!sessionData) {
      toast.error("you need to login first");
      return;
    } else {
      const response = await addToWishlist(product);
      toast.success("product added successfuly to your wishlist");
      await getWishlistDetails();
    }
  };
  // 3. handle remove from wishlist
  const handleRemoveFromWishlist = async (productId: string) => {
    if (!sessionData) {
      toast.error("you need to login first");
      return;
    } else {
      await removeFromWishlist(productId);
      toast.success("item removed successfuly from your wishlist");
      await getWishlistDetails();
    }
  };

  // handle cart
  // get user cart after adding an item
  const { getCartDetails } = useCart();
  // async function to add product to cart
  const handleAddToCart = async (product: Product) => {
    if (!sessionData) {
      toast.error("you need to login first");
      return;
    } else {
      const response = await addToCart(product);
      toast.success("product added to cart successfuly");
      await getCartDetails();
    }
  };
  return (
    <div className="flex flex-col text-start group gap-1">
      <div className="item-image relative w-full h-52 rounded-md overflow-hidden border-secondary border-2 group-[&:hover]:border-primary duration-75">
        {/* overlay */}
        <div className="overlay bg-transparent absolute top-0 right-0 w-20 h-full z-[1] flex flex-col pt-2 gap-2 justify-start items-center">
          {/* conditional rendering for the wishlist button (add | remove) */}
          {wishlistProducts?.some((product) => product._id === item._id) ? (
            // already wishlisted
            <div
              onClick={() => handleRemoveFromWishlist(item._id)}
              className="icon-container p-2 rounded-full bg-background cursor-pointer shadow-lg"
            >
              <Heart
                className={`hover:text-primary fill-red-500 text-red-50`}
              />
            </div>
          ) : (
            // not wishlisted
            <div
              onClick={() => handleAddToWishlist(item)}
              className="icon-container p-2 rounded-full bg-background cursor-pointer shadow-lg"
            >
              <Heart className={`hover:text-primary`} />
            </div>
          )}
          <div className="icon-container p-2 rounded-full bg-background cursor-pointer shadow-lg">
            <Link href={`/products/${item?._id}`}>
              <Eye className="hover:text-primary" />
            </Link>
          </div>
          <div
            onClick={() => handleAddToCart(item)}
            className="icon-container p-2 rounded-full bg-background cursor-pointer shadow-lg"
          >
            <ShoppingCart className="hover:text-primary" />
          </div>
        </div>
        {/* image */}
        <Link
          href={`/products/${item?._id}`}
          className="relative inline-block w-full h-full"
        >
          <Image
            src={item?.imageCover}
            alt={"item"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain object-center group-[&:hover]:scale-115 duration-300"
          />{" "}
        </Link>
      </div>
      <Link href={`/products/${item?._id}`}>
        <p className="item-title font-bold hover:text-primary">
          {item?.title.split(" ").slice(0, 5).join(" ")}
        </p>
      </Link>

      <p className="item-title font-bold text-primary">EGP {item?.price}</p>
      {/* ratings */}
      <div className="rating-container">
        <div className="flex gap-2 items-center ">
          <StarRating
            isHalfRatingEnabled={true}
            dimension={6}
            initialRating={Math.round(item?.ratingsAverage * 2) / 2}
          />
          <p className="text-sm font-bold text-slate-600/70">
            ({item?.ratingsQuantity})
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductsShoppingSection = ({
  sectionTitle,
  sectionData,
  viewAll = true,
  filter,
}: {
  sectionTitle: string;
  sectionData: Product[];
  viewAll?: boolean;
  filter?: Category[];
}) => {
  // 1. get all wishlist
  const { getWishlistDetails } = useWishlist();
  // 2. get session
  const { data: sessionData } = useSession();
  useEffect(() => {
    getWishlistDetails();
  }, []);
  return (
    <>
      <section className="mt-10 mb-20 items-section">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">
            <span className="text-primary">{sectionTitle}</span>
          </h2>
          {viewAll && (
            <Link href={`/${sectionTitle}`}>
              <div className="flex capitalize gap-1">
                view all <ChevronRight className="text-primary" />
              </div>
            </Link>
          )}
        </div>
        <div className="line-separator w-full h-0.5 bg-secondary mt-2">
          <div className="line-separator w-1/5 h-0.5 bg-primary mt-2"></div>
        </div>
        {filter && <ProductsFilter categories={filter} />}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12 px-5 md:px-0">
          {sectionData?.map((item) => (
            <ProductsShoppingSectionItem
              key={item._id}
              item={item}
              sessionData={sessionData}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductsShoppingSection;
