/* Replace with your SQL commands */

/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.cart (
    id TEXT NOT NULL,
    userId TEXT NOT NULL,
    productsId TEXT[] NOT NULL,
    CONSTRAINT cart_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.cart
    OWNER TO postgres;
