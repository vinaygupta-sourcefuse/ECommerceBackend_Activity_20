/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS public."user"
(
    user_id SERIAL PRIMARY KEY,
    name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default" NOT NULL,
    permissions text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;




CREATE TABLE IF NOT EXISTS public.refreshtoken
(
    token text COLLATE pg_catalog."default" NOT NULL,
    userId integer NOT NULL,
    expiresAt text COLLATE pg_catalog."default" NOT NULL,
    createdAt text COLLATE pg_catalog."default" DEFAULT '2025-05-20T13:31:50.333Z'::text,
    CONSTRAINT refreshtoken_pkey PRIMARY KEY (token)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.refreshtoken
    OWNER to postgres;