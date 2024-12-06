export interface IProducts {
  products?: IProduct[];
}
export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: string;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
