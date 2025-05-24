To write a **proper PostgreSQL migration using `db-migrate`**, you'll need to follow its standard structure:
 
---

## ✅ Step-by-Step Guide

### 1. **Create Migration**

Use the CLI to generate the skeleton:

```bash
npx db-migrate create create-category-table --sql-file
```

This will generate two files in your `migrations/` directory:

* `sqls/<timestamp>-create-category-table-up.sql`
* `sqls/<timestamp>-create-category-table-down.sql`

And a stub in `migrations/<timestamp>-create-category-table.js`

---

### 2. **Write Raw SQL in SQL Files**

#### 🟩 `sqls/<timestamp>-create-category-table-up.sql`:

```sql
CREATE TABLE IF NOT EXISTS public.category
(
    id integer NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    imageurl text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    CONSTRAINT category_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.category
    OWNER TO postgres;
```

#### 🟥 `sqls/<timestamp>-create-category-table-down.sql`:

```sql
DROP TABLE IF EXISTS public.category;
```

---

### 3. **Migration JS File**

No need to modify the JS file generated — it looks like this:

```js
'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.runSqlFile('./sqls/<timestamp>-create-category-table-up.sql');
};

exports.down = function (db) {
  return db.runSqlFile('./sqls/<timestamp>-create-category-table-down.sql');
};

exports._meta = {
  version: 1,
};
```

✅ Replace `<timestamp>` with the actual prefix (e.g., `20240524120130`).

---

### 4. **Run the Migration**

```bash
npx db-migrate up
```

### 5. **Verify**

Check the PostgreSQL table:

```sql
SELECT * FROM public.category;
```

---

## 🚀 Optional: Seed Insert as Separate Migration

If you want to insert category records as a separate migration:

```bash
npx db-migrate create seed-category-data --sql-file
```

Then in the `up.sql` file, add your `INSERT INTO category (...) VALUES (...)` statement from earlier.

Let me know if you'd like to template this with category data as part of the migration or abstract that to a later seed run.
