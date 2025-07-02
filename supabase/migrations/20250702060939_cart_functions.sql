-- 🪙 Add or increment item
CREATE OR REPLACE FUNCTION add_to_cart(uid UUID, pid UUID)
RETURNS VOID
LANGUAGE PLPGSQL
AS $$
BEGIN
  INSERT INTO cart_items (user_id, product_id, quantity)
  VALUES (uid, pid, 1)
  ON CONFLICT (user_id, product_id)
  DO UPDATE SET quantity = cart_items.quantity + 1;
END;
$$;

-- ⚔️ Update quantity or delete if 0
CREATE OR REPLACE FUNCTION update_cart_quantity(uid UUID, pid UUID, qty INT)
RETURNS VOID
LANGUAGE PLPGSQL
AS $$
BEGIN
  IF qty <= 0 THEN
    DELETE FROM cart_items WHERE user_id = uid AND product_id = pid;
  ELSE
    UPDATE cart_items SET quantity = qty
    WHERE user_id = uid AND product_id = pid;
  END IF;
END;
$$;

-- ☠️ Remove item from cart
CREATE OR REPLACE FUNCTION remove_from_cart(uid UUID, pid UUID)
RETURNS VOID
LANGUAGE SQL
AS $$
  DELETE FROM cart_items WHERE user_id = uid AND product_id = pid;
$$;
