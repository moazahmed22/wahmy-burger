interface CartResponse {
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  totalCartPrice: number;
}

interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

interface Product {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  ratingsAverage: number;
  id: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export type { CartResponse, CartProduct };
