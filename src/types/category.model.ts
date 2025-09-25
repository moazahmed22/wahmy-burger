interface Category {
  createdAt: string;
  image: string;
  name: string;
  slug: string;
  updatedAt: string;
  _id: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type { Category, SubCategory };
