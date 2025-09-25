"use client";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Product } from "@/types/product.model";
import Link from "next/link";
import { usePathname } from "next/navigation";
import products from "@/../public/data/wahmy-products.json";

const SearchProductComp = () => {
  const pathname = usePathname();
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const handleSearchProduct = (value: string) => {
    setSearchedTerm(value);
    if (value !== "") {
      setSearchResults(
        products.filter((product) =>
          product?.title.toLowerCase().match(searchedTerm.toLowerCase())
        )
      );
    } else {
      setSearchResults(null);
    }
  };
  useEffect(() => {
    setSearchResults(null);
  }, [pathname]);

  return (
    <>
      <div className="min-w-[200px] relative md:min-w-[300px] md:flex">
        <NavigationMenuItem className="flex items-center bg-secondary px-3 py-1 w-full focus-within:ring-primary/50 focus-within:ring-3 rounded-md">
          <Input
            type="search"
            placeholder="What are you looking for?"
            className="shadow-none border-0 focus-visible:ring-0"
            value={searchedTerm}
            onChange={(e) => handleSearchProduct(e.target.value)}
            name="searchbar"
          />
          <Search />
        </NavigationMenuItem>
        {searchResults && (
          <div className="absolute bottom-0 translate-y-[100%] w-full bg-background border-2 border-b-0 rounded-md">
            {searchResults?.map((result) => (
              <Link
                href={`/products/${result?._id}`}
                key={result?._id}
                className="flex items-center gap-5 border-b-2 p-2 hover:bg-accent cursor-pointer"
              >
                <Search />
                {result?.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchProductComp;
