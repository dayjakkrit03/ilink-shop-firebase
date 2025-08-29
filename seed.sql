-- This script contains all the necessary SQL commands to set up and seed the database.
-- It includes table creations and data insertions.

-- 1) Create missing join tables for coupons
CREATE TABLE IF NOT EXISTS coupon_categories (
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (coupon_id, category_id)
);

CREATE TABLE IF NOT EXISTS coupon_products (
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (coupon_id, product_id)
);

CREATE TABLE IF NOT EXISTS coupon_users (
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (coupon_id, user_id)
);

-- 2) Insert coupon data and establish relationships
INSERT INTO coupons (code,type,value,min_subtotal,starts_at,ends_at,max_uses,is_active)
VALUES
('CLEAR10','percent',10.00,1000.00, now() - interval '7 days', now() + interval '30 days', 1000, true),
('SWITCH200','amount',200.00,1000.00, now() - interval '7 days', now() + interval '90 days', 1000, true)
ON CONFLICT (code) DO NOTHING;

-- Scope CLEAR10 to LAN + FIBER categories
INSERT INTO coupon_categories (coupon_id, category_id)
SELECT (SELECT id FROM coupons WHERE code='CLEAR10'), c.id
FROM categories c WHERE c.slug IN ('lan-utp-system','fiber-optic-system')
ON CONFLICT DO NOTHING;

-- Scope SWITCH200 to a specific 24-port switch product
INSERT INTO coupon_products (coupon_id, product_id)
SELECT (SELECT id FROM coupons WHERE code='SWITCH200'),
       (SELECT id FROM products WHERE slug='24-port-gigabit-switch')
ON CONFLICT DO NOTHING;

-- Assign CLEAR10 to a specific customer (optional)
INSERT INTO coupon_users (coupon_id, user_id)
SELECT (SELECT id FROM coupons WHERE code='CLEAR10'),
       (SELECT id FROM users WHERE email='customer@demo.local')
ON CONFLICT DO NOTHING;

-- 3) Insert a complete sample order
INSERT INTO orders (
  order_no,user_id,status,
  subtotal_amount,discount_amount,shipping_amount,tax_amount,total_amount,
  shipping_address_id,billing_address_id,placed_at,note
)
SELECT
 'INV-2025-0001',
 u.id,
 'paid',
 14770.00,        -- 8190 + (3290*2)
 1477.00,         -- CLEAR10 (10%)
 120.00,
 0.00,
 13413.00,        -- 14770 - 1477 + 120
 (SELECT id FROM addresses WHERE user_id=u.id AND is_default=true LIMIT 1),
 (SELECT id FROM addresses WHERE user_id=u.id AND is_default=true LIMIT 1),
 now() - interval '2 days',
 'ตัวอย่างคำสั่งซื้อจาก Seed Script'
FROM users u WHERE u.email='customer@demo.local'
ON CONFLICT (order_no) DO NOTHING;

INSERT INTO order_items (order_id, product_id, variant_id, title, sku, unit_price, quantity, total_price, line_discount)
SELECT
 (SELECT id FROM orders WHERE order_no='INV-2025-0001'),
 (SELECT id FROM products WHERE slug='24-port-gigabit-switch'),
 (SELECT id FROM product_variants WHERE sku='SW-24G-M'),
 '24-Port Gigabit Network Switch (Managed)',
 'SW-24G-M',
 8190.00, 1, 8190.00, 0.00
ON CONFLICT DO NOTHING;

INSERT INTO order_items (order_id, product_id, variant_id, title, sku, unit_price, quantity, total_price, line_discount)
SELECT
 (SELECT id FROM orders WHERE order_no='INV-2025-0001'),
 (SELECT id FROM products WHERE slug='cat6-utp-cable-lszh-305m'),
 (SELECT id FROM product_variants WHERE sku='C6-LSZH-305-BLU'),
 'CAT6 UTP Cable LSZH 305m - Blue',
 'C6-LSZH-305-BLU',
 3290.00, 2, 6580.00, 0.00
ON CONFLICT DO NOTHING;

INSERT INTO order_coupons (order_id, coupon_id, discount)
SELECT (SELECT id FROM orders WHERE order_no='INV-2025-0001'),
       (SELECT id FROM coupons WHERE code='CLEAR10'),
       1477.00
ON CONFLICT DO NOTHING;

INSERT INTO payments (order_id, provider, status, amount, currency, txn_id, paid_at, payload)
SELECT (SELECT id FROM orders WHERE order_no='INV-2025-0001'),
       'credit_card','captured',13413.00,'THB','TXN-DEMO-0001', now() - interval '2 days',
       '{"method":"VISA"}'::jsonb
ON CONFLICT DO NOTHING;

INSERT INTO shipments (order_id, carrier, tracking_no, status, shipped_at, delivered_at, address)
SELECT
  o.id, 'Kerry', 'KRY123456789TH', 'in_transit',
  now() - interval '1 day', NULL,
  jsonb_build_object(
    'full_name', a.full_name,
    'phone', a.phone,
    'line1', a.line1,
    'line2', a.line2,
    'district', a.district,
    'city', a.city,
    'province', a.province,
    'postal_code', a.postal_code,
    'country', a.country
  )
FROM orders o
JOIN addresses a ON a.id = o.shipping_address_id
WHERE o.order_no='INV-2025-0001'
ON CONFLICT DO NOTHING;
