/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public."order"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp with time zone,
    updatedat timestamp with time zone,
    subtotal integer DEFAULT 0,
    taxamount integer DEFAULT 0,
    shippingamount integer DEFAULT 0,
    discountamount integer DEFAULT 0,
    grandtotal integer DEFAULT 0,
    user_email text COLLATE pg_catalog."default",
    shippingmethod text COLLATE pg_catalog."default",
    shippingstatus text COLLATE pg_catalog."default",
    trackingnumber text COLLATE pg_catalog."default",
    shippedat timestamp with time zone,
    deliverat timestamp with time zone,
    shippingaddress text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    CONSTRAINT order_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."order"
    OWNER to postgres;