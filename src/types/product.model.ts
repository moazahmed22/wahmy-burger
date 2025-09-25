import { Category } from "./category.model";

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type { Product };
