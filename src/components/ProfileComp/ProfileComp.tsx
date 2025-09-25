"use client";
import React, { useEffect } from "react";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Heart, LogOut, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/app/context/CartContext/CartContext";
import { useWishlist } from "@/app/context/WishlistContext/WishlistContext";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const ProfileComp = () => {
  // get session data
  const { data: sessionData } = useSession();
  // get logged user
  const user = sessionData?.user;

  // call cart & wishtlist on session change
  const { getCartDetails } = useCart();
  const { getWishlistDetails } = useWishlist();
  const handleCartAndWishlist = async () => {
    await getCartDetails();
    await getWishlistDetails();
  };
  useEffect(() => {
    handleCartAndWishlist();
  }, [sessionData]);

  return (
    <>
      {" "}
      <NavigationMenuItem className="inline-flex">
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`focus-visible:outline-0 cursor-pointer`}
          >
            <div
              className={`${
                sessionData ? "bg-red-500" : "bg-white"
              } rounded-full flex items-center justify-center icon-containter p-1`}
            >
              <User
                className={`${sessionData ? "text-white" : "text-foreground"}`}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-64 bg-foreground/70 text-background">
            {!sessionData ? (
              <>
                <DropdownMenuItem className="h-10">
                  <Link
                    href="/login"
                    className={`flex gap-2 capitalize font-medium items-center w-full`}
                  >
                    <User className="!w-5 !h-5" />
                    login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/cart"
                    className={`flex gap-2 capitalize font-medium w-full`}
                  >
                    <ShoppingCart className="!w-5 !h-5" />
                    cart
                  </Link>
                </DropdownMenuItem>{" "}
              </>
            ) : (
              <>
                {" "}
                <DropdownMenuLabel
                  className={`flex gap-2 capitalize font-medium w-full px-2 py-1.5`}
                >
                  <User className="!w-5 !h-5" />
                  {user?.name}
                </DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link
                    href="/wishlist"
                    className={`flex gap-2 capitalize font-medium w-full`}
                  >
                    <Heart className="!w-5 !h-5" />
                    wishlist
                  </Link>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem>
                  <Link
                    href="/cart"
                    className={`flex gap-2 capitalize font-medium w-full`}
                  >
                    <ShoppingCart className="!w-5 !h-5" />
                    cart
                  </Link>
                </DropdownMenuItem>{" "}
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="capitalize font-medium w-full hover:!bg-red-500 hover:!text-background cursor-pointer"
                >
                  <LogOut className="!w-5 !h-5" /> sign out
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </NavigationMenuItem>
    </>
  );
};

export default ProfileComp;
