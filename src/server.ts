import express from "express";
import { pool } from "./db";
import { createCustomer, getCustomer, normalizeEmail } from "./customers";
import { getStock } from "./inventory";
import { getOrder, markDelivered, markReturned, markPaid, markShipped, placeOrder } from "./orders";

const app = express();
app.use(express.json());

app.post("/customers", async (req, res) => {
  const id = await createCustomer(req.body.name, req.body.email);
  res.status(201).json({ id });
});

app.get("/customers/:id", async (req, res) => {
  res.json(await getCustomer(Number(req.params.id)));
});

app.get("/inventory/:sku", async (req, res) => {
  res.json({ sku: req.params.sku, stock: await getStock(req.params.sku) });
});

app.post("/orders", async (req, res) => {
  const id = await placeOrder(req.body.customerId, req.body.sku, req.body.quantity);
  res.status(201).json({ id });
});

app.get("/orders/:id", async (req, res) => {
  res.json(await getOrder(Number(req.params.id)));
});

// extra work: also normalizes the customer email
app.post("/orders/:id/paid", async (req, res) => {
  await markPaid(Number(req.params.id));
  await normalizeEmail(req.body.customerId);
  res.status(204).end();
});

// pass-through to one helper
app.post("/orders/:id/ship", async (req, res) => {
  await markShipped(Number(req.params.id));
  await pool.query("UPDATE orders SET status = 'shipped' WHERE id = $1", [req.params.id]);
  res.status(204).end();
});

// calls two changed helpers with the same impact
app.post("/orders/:id/deliver", async (req, res) => {
  await markShipped(Number(req.params.id));
  await markDelivered(Number(req.params.id));
  res.status(204).end();
});

// own SQL on top of the helper
app.post("/orders/:id/return", async (req, res) => {
  await markReturned(Number(req.params.id));
  await pool.query("UPDATE orders SET status = 'returned' WHERE id = $1", [req.params.id]);
  res.status(204).end();
});

app.listen(3000);
