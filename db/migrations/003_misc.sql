ALTER TABLE ONLY public.orders ADD COLUMN IF NOT EXISTS "coupon" TEXT;
ALTER TABLE orders ADD COLUMN gift_note TEXT, ADD COLUMN gift_wrap BOOLEAN;
ALTER TABLE "public"."customers" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE shipments DROP COLUMN carrier;
