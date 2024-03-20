export interface Product {
  id: number;
  categoryID: number;
  image: string;
  title: string;
  info: string;
  price: number;
  isBestSeller: boolean;
  isFavorite: boolean;
}
