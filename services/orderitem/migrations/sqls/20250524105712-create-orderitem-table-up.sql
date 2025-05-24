/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public.orderitem
(
    id text COLLATE pg_catalog."default" NOT NULL,
    productsid text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT orderitem_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.orderitem
    OWNER to postgres;