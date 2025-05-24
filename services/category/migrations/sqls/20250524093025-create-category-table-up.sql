CREATE TABLE IF NOT EXISTS public.category
(
    id SERIAL PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    imageurl text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default"
);

ALTER TABLE IF EXISTS public.category
    OWNER TO postgres;
