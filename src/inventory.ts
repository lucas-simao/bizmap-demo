import { pool } from "./db";

/** Returns how many units of a product are in stock. */
export async function getStock(sku: string): Promise<number> {
  const { rows } = await pool.query("SELECT stock FROM inventory WHERE sku = $1", [sku]);
  return rows[0]?.stock ?? 0;
}

/** Removes units from stock when an order is placed. */
export async function reserveStock(sku: string, quantity: number): Promise<void> {
  await pool.query(
    "UPDATE inventory SET stock = stock - $2, updated_at = now() WHERE sku = $1",
    [sku, quantity],
  );
}
