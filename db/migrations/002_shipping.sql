-- shipping support
ALTER TABLE public.orders ADD COLUMN tracking_code TEXT;
ALTER TABLE "orders" ALTER COLUMN quantity TYPE BIGINT;
ALTER TABLE public."inventory" DROP COLUMN updated_at;
ALTER TABLE customers RENAME COLUMN name TO full_name;

CREATE TABLE public."shipments" (
  id       SERIAL PRIMARY KEY,
  "order_id" INTEGER NOT NULL,
  carrier  TEXT,
  shipped_at TIMESTAMPTZ
);

CREATE TABLE "warehouses" (
  id   SERIAL PRIMARY KEY,
  city TEXT NOT NULL
);
