"use client";

import React, { createContext, useState } from "react";
type CategoryFilterContextType = {
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategoryFilterContext = createContext<CategoryFilterContextType | null>(
  null
);

const CategoryFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  return (
    <CategoryFilterContext.Provider
      value={{ activeCategory, setActiveCategory }}
    >
      {children}
    </CategoryFilterContext.Provider>
  );
};

export { CategoryFilterContext, CategoryFilterProvider };
