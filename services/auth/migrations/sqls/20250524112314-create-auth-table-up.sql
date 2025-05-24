-- userId is auto-incremented via SERIAL, matching LoopBack's generated: true.

-- permissions is stored as a native PostgreSQL TEXT[] array.

-- Wrapped "user" in quotes because user is a reserved keyword in PostgreSQL — always quote it in schema-level work.

CREATE TABLE IF NOT EXISTS public."user" (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    permissions TEXT[] DEFAULT ARRAY['2']
);

ALTER TABLE IF EXISTS public."user"
    OWNER TO postgres;



-- createdAt uses now() instead of hardcoded timestamp.
-- token is the primary key.

CREATE TABLE IF NOT EXISTS public.refreshtoken (
    token TEXT NOT NULL,
    userId INTEGER NOT NULL,
    expiresAt TEXT NOT NULL,
    createdAt TEXT DEFAULT now()::TEXT,
    CONSTRAINT refreshtoken_pkey PRIMARY KEY (token)
);

ALTER TABLE IF EXISTS public.refreshtoken
    OWNER TO postgres;
