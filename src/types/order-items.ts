export type OrderItems = {
  product_id: string;
  quantity: number;
  products: {
    title: string;
    price: number;
  };
};