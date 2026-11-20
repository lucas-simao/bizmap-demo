CREATE TABLE customers (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT
);

CREATE TABLE inventory (
  sku        TEXT PRIMARY KEY,
  stock      BIGINT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id          SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(id),
  sku         TEXT NOT NULL REFERENCES inventory(sku),
  quantity    INTEGER NOT NULL,
  coupon_code TEXT,
  status      TEXT NOT NULL DEFAULT 'created',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
