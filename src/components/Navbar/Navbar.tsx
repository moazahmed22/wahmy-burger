"use server";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import SearchProductComp from "../SearchProductComp/SearchProductComp";
import ProfileComp from "../ProfileComp/ProfileComp";
import Image from "next/image";

const Navbar = () => {
  const whiteLogo = "/identity/white-logo.png";
  const blackLogo = "/identity/black-logo.png";
  return (
    <>
      <div className="container bg-background md:min-w-[fit-content] m-auto pt-10 pb-5 sticky top-0 left-0 right-0 z-20 md:relative">
        <NavigationMenu className="justify-between md:gap-5 items-center min-w-full">
          {/* site name */}
          <NavigationMenuList>
            <NavigationMenuItem className="block relative w-30 h-20">
              <Link href="/" className="relative w-full h-full inline-block">
                <Image
                  src={blackLogo}
                  alt="logo"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="inline-block object-contain object-center"
                />
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* searchbar and icons  */}
          <NavigationMenuList className="gap-2 md:gap-5">
            {/* searchbar */}
            <SearchProductComp />
            {/* account dropdown menu */}
            <ProfileComp />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
};

export default Navbar;
