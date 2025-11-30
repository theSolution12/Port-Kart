export type CartItem = {
    id: string;
    product_id: string;
    quantity: number;
    product: {
      title: string;
      price: number;
    };
  };