export type OrderItems = {
  id: string;
  product_id: string;
  quantity: number;
  address: string;
  created_at: string;
  products: {
    title: string;
    price: number;
  };
};