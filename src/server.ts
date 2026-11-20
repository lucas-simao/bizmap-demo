import express from "express";
import { createCustomer, getCustomer } from "./customers";
import { getStock } from "./inventory";
import { getOrder, markPaid, placeOrder } from "./orders";

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

app.post("/orders/:id/paid", async (req, res) => {
  await markPaid(Number(req.params.id));
  res.status(204).end();
});

app.listen(3000);
