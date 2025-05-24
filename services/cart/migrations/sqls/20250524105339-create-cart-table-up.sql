/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.cart
(
    id text COLLATE pg_catalog."default" NOT NULL,
    userid text COLLATE pg_catalog."default" NOT NULL,
    productsid text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT cart_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart
    OWNER to postgres;