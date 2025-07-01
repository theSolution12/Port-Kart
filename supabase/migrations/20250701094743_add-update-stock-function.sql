
CREATE OR REPLACE FUNCTION update_stock(pid uuid, qty int)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET stock = GREATEST(stock + qty, 0)
  WHERE id = pid;
END;
$$ LANGUAGE plpgsql;
