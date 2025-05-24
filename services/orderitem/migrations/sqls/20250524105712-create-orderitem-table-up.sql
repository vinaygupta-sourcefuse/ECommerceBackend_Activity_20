CREATE TABLE IF NOT EXISTS public.orderitem (
    id TEXT PRIMARY KEY,
    productsId TEXT[] NOT NULL
);

ALTER TABLE IF EXISTS public.orderitem
    OWNER TO postgres;
