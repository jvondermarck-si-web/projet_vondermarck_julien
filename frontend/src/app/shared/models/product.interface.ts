export interface Product {
  id: number;
  categoryId: number;
  image: string;
  title: string;
  info: string;
  price: number;
  isBestSeller: boolean;
  isFavorite: boolean;
}
