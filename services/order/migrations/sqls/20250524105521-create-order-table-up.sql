-- ============================================================================
-- Table: "order"
-- 
-- Notes:
-- - Table name "order" is quoted due to being a reserved keyword in PostgreSQL.
-- - Primary key uses UUID with DEFAULT gen_random_uuid() (reflects defaultFn: 'uuidv4').
-- - All monetary values are stored as NUMERIC for precision and financial safety.
-- - Columns such as user_email, shipping_method, etc., are nullable (optional).
-- - The phone field does not enforce a pattern at the DB level; validation is expected at the application or constraint level.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public."order" (
    
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT DEFAULT now()::TEXT,
    updatedAt TEXT DEFAULT now()::TEXT,
    subtotal INTEGER DEFAULT 0,
    taxAmount INTEGER DEFAULT 0,
    shippingAmount INTEGER DEFAULT 0,
    discountAmount INTEGER DEFAULT 0,
    grandTotal INTEGER DEFAULT 0,
    user_email TEXT,
    shippingMethod TEXT,
    shippingStatus TEXT,
    trackingNumber TEXT,
    shippedAt TEXT DEFAULT now()::TEXT,
    deliverAt TEXT DEFAULT now()::TEXT,
    shippingAddress TEXT,
    name TEXT,
    phone TEXT
);

ALTER TABLE IF EXISTS public."order"
    OWNER TO postgres;
