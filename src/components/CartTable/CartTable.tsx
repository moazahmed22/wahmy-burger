"use client";
import { useCart } from "@/app/context/CartContext/CartContext";
import { removeFromCart, updateProductQuantity } from "@/lib/cart.util";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export function CartTable() {
  // get user session data
  const { data: sessionData } = useSession();
  // call user cart
  const { cartDetails, getCartDetails } = useCart();
  const cartContent = cartDetails?.data;
  const numberOfCartItems = cartDetails?.numOfCartItems || null;

  // handle item update
  const handleProductUpdate = async (productId: string, count: number) => {
    await updateProductQuantity(productId, count);
    await getCartDetails();
    toast.success("product updated successfuly");
  };
  // handle product remove from cart
  const handleProductRemove = async (productId: string) => {
    await removeFromCart(productId);
    await getCartDetails();
    toast.success("product removed successfuly");
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 my-11">
        <div className="header grid grid-cols-4  px-10 py-6 shadow-[0_0_10px_5px_#f5f5f5] rounded-md justify-between">
          <div className="title capitalize font-medium">product</div>
          <div className="title capitalize font-medium flex justify-center items-center">
            price
          </div>
          <div className="title capitalize font-medium flex justify-center items-center">
            quantity
          </div>
          <div className="title capitalize font-medium flex justify-center items-center">
            subtotal
          </div>
        </div>
        {/* cart body */}
        {cartContent?.products.map((product) => (
          <div
            key={product._id}
            className="body grid grid-cols-4 px-10 py-6 shadow-[0_0_10px_5px_#f5f5f5] rounded-md justify-between"
          >
            {/* product */}
            <div className="product flex gap-1 items-center">
              <div className="product-image-container relative w-10 h-10 hidden md:block">
                <X
                  onClick={() => handleProductRemove(product?.product?._id)}
                  className="text-background rounded-full px-1 absolute top-[-10px] left-[-10px] bg-primary z-10 cursor-pointer"
                />
                <Image
                  src={product?.product.imageCover}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                  loading="eager"
                  alt={"product-image"}
                  className="object-contain object-center"
                />
              </div>
              <Link
                href={`/products/${product?.product?._id}`}
                className="cursor-pointer"
              >
                <div className="product-title font-medium">
                  <span className="hover:text-primary">
                    {product?.product.title}
                  </span>
                </div>
              </Link>
            </div>
            {/* price */}
            <div className="product-price font-medium flex justify-center items-center">
              <span className="align-middle">EGP {product?.price}</span>
            </div>
            {/* quantity */}
            <div className="product-quantity font-medium flex justify-center items-center">
              {/* number input */}
              <div className=" border-2 px-3 py-1.5 rounded-md flex">
                <input
                  type="number"
                  name="productQuantity"
                  id="productQuantity"
                  value={product?.count}
                  min={0}
                  max={product?.product.quantity}
                  readOnly
                />
                <div className="actions flex flex-col">
                  <button
                    className="increase cursor-pointer"
                    onClick={() =>
                      handleProductUpdate(
                        product?.product?._id,
                        product?.count + 1
                      )
                    }
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    className="decrease cursor-pointer"
                    onClick={() =>
                      handleProductUpdate(
                        product?.product?._id,
                        product?.count - 1
                      )
                    }
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* subtotal */}
            <div className="product-price font-medium flex justify-center items-center">
              <span className="">EGP {product?.price * product?.count}</span>
            </div>
          </div>
        ))}

        {/* call to action container */}
        <div className="action-container flex">
          <Link href={"/"}>
            <div className="px-12 py-4 capitalize font-medium border-2 rounded-md cursor-pointer">
              return to shop
            </div>
          </Link>
        </div>
        {/* coupon section & cart details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-0 md:gap-x-12 lg:gap-x-32">
          {/* coupon section */}
          <div className="flex gap-4 self-start">
            <input
              type="text"
              placeholder="coupon code"
              className="border-2 rounded-md ps-6 py-4 flex-1 min-w-[100px] inline-block"
              name="couponCode"
            />
            <button className="apply-coupon bg-primary text-background text-base text-nowrap capitalize rounded-md lg:px-12 px-6 py-4">
              apply coupon
            </button>
          </div>
          {/* cart details */}
          <div className="flex flex-col px-6 py-8 gap-4 border-2 rounded-md border-foreground">
            <h3 className="title capitalize font-bold text-xl mb-2">
              cart total
            </h3>
            <div className="car-details flex flex-col gap-4">
              {/* subtotal */}
              <div className="subtotal font-medium border-b-2 pb-4 flex w-full justify-between">
                <span className="capitalize title">subtotal:</span>
                <span className="capitalize value">
                  EGP {cartContent?.totalCartPrice}
                </span>
              </div>
              {/* shipping */}
              <div className="subtotal font-medium border-b-2 pb-4 flex w-full justify-between">
                <span className="capitalize title">shipping:</span>
                <span className="capitalize value">free</span>
              </div>
              {/* total */}
              <div className="subtotal font-medium flex w-full justify-between">
                <span className="capitalize title">total:</span>
                <span className="capitalize value">
                  EGP {cartContent?.totalCartPrice}
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                disabled={sessionData && numberOfCartItems ? true : false}
                className={`apply-coupon text-background rounded-md px-12 py-4 ${
                  sessionData && numberOfCartItems
                    ? "cursor-pointer bg-primary"
                    : "cursor-not-allowed bg-primary/60"
                }`}
              >
                Procees to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
