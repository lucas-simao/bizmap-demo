import { pool } from "./db";
import { getStock, reserveStock } from "./inventory";

/** Stores a new pending order if there is enough stock. */
export async function placeOrder(customerId: number, sku: string, quantity: number) {
  const stock = await getStock(sku);
  if (stock < quantity) {
    throw new Error("out of stock");
  }
  await reserveStock(sku, quantity);
  const { rows } = await pool.query(
    "INSERT INTO orders (customer_id, sku, quantity, status) VALUES ($1, $2, $3, 'pending') RETURNING id",
    [customerId, sku, quantity],
  );
  return rows[0].id as number;
}

/** Loads one order by id. */
export async function getOrder(id: number) {
  const { rows } = await pool.query(
    "SELECT id, customer_id, sku, quantity, status FROM orders WHERE id = $1",
    [id],
  );
  return rows[0];
}

/** Marks an order as paid. */
export async function markPaid(id: number) {
  await pool.query("UPDATE orders SET status = 'paid' WHERE id = $1", [id]);
}
