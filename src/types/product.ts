export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  stock: number,
  seller_id: string;
  seller?: {
    name: string;
  };
};