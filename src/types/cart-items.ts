export type CartItem = {
    quantity: number;
    product: {
      id: string;
      title: string;
      price: number;
      stock: number;
      seller_id: string;
    };
  };