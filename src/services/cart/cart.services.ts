import api from "@/lib/api/client";
import type { CartItem } from "@/types/cart-items";

  // Add item or increment quantity
  export const addToCart = async ({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) => {
    const data = await api.post(
      "/api/cart/add-to-cart",
      { userId, productId },
    )
    return data;
  };
  
  
  
  // Fetch current cart
  export const getCartItems = async (userId: string): Promise<CartItem[]> => {
    const data = await api.post<CartItem[]>(
      "/api/cart/get-cart-items",
      { userId }
    )
    return data;
  };
  
  
  
  // Update quantity
  export const updateCartQuantity = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) => {
    const data = await api.post(
      "/api/cart/update-cart-quantity",
      { userId, productId, quantity }
    )
    return data;
  };
  
  
  
  
  // Remove from cart
  export const removeFromCart = async ({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) => {
    const data = await api.post(
      "/api/cart/remove-from-cart",
      { userId, productId }
    )
    return data;
  };
  
  
  