import { pool } from "./db";

/** Loads one customer by id. */
export async function getCustomer(id: number) {
  const { rows } = await pool.query("SELECT id, name, email FROM customers WHERE id = $1", [id]);
  return rows[0];
}

/** Registers a new customer. */
export async function createCustomer(name: string, email: string) {
  const { rows } = await pool.query(
    "INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING id",
    [name, email],
  );
  return rows[0].id as number;
}
