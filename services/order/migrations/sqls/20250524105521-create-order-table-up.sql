/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public."order"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    createdAt timestamp with time zone,
    updatedAt timestamp with time zone,
    subtotal integer DEFAULT 0,
    taxAmount integer DEFAULT 0,
    shippingAmount integer DEFAULT 0,
    discountAmount integer DEFAULT 0,
    grandTotal integer DEFAULT 0,
    user_email text COLLATE pg_catalog."default",
    shippingMethod text COLLATE pg_catalog."default",
    shippingStatus text COLLATE pg_catalog."default",
    trackingNumber text COLLATE pg_catalog."default",
    shippedAt timestamp with time zone,
    deliverAt timestamp with time zone,
    shippingAddress text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    phone text COLLATE pg_catalog."default",
    CONSTRAINT order_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."order"
    OWNER to postgres;