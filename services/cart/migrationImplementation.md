# LoopBack + Sequelize + DB-Migrate Integration

This document outlines the setup and execution steps to use Sequelize as the ORM with LoopBack 4 and manage schema migrations using [`db-migrate`](https://db-migrate.readthedocs.io/en/latest/).

---

## 📦 Prerequisites

Ensure you have the following installed:

* Node.js >= 16.x
* PostgreSQL >= 12
* `npm` or `yarn`

---

## 🛠️ Step-by-Step Integration Guide

### 1. Modify the Datasource to Use Sequelize

Replace the default LoopBack `juggler.DataSource` with `SequelizeDataSource`:

**Before:**

```ts
import {juggler} from '@loopback/repository';

export class CartDataSource extends juggler.DataSource {
  //...
}
```

**After:**

```ts
import {SequelizeDataSource} from '@loopback/sequelize';

export class CartDataSource extends SequelizeDataSource {
  //...
}
```

---

### 2. Update the Repository Class

Replace the default `DefaultCrudRepository` with `SequelizeCrudRepository`:

**Before:**

```ts
import {DefaultCrudRepository} from '@loopback/repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id
> {}
```

**After:**

```ts
import {SequelizeCrudRepository} from '@loopback/sequelize';

export class CartRepository extends SequelizeCrudRepository<
  Cart,
  typeof Cart.prototype.id
> {}
```

---

### 3. Register Migration Service

In `application.ts`, register the migration service:

```ts
import {MigrationServiceProvider} from './services/migration.service';

this.bind('services.MigrationService').toProvider(MigrationServiceProvider);
```

---

### 4. Implement the Migration Service

Create a `migration.service.ts` in the `services/` directory:

```ts
import {inject, Provider} from '@loopback/core';
import {DataSource} from '@loopback/repository';
import * as path from 'path';
const dbmigrate = require('db-migrate');

export class MigrationService {
  constructor(
    @inject('datasources.user')
    private dataSource: DataSource,
  ) {}

  async migrate() {
    const dbm = dbmigrate.getInstance(true, {
      config: path.resolve('./database.json'),
      env: process.env.NODE_ENV || 'dev',
    });
    await dbm.up();
    console.log('Migrations executed successfully');
  }

  async rollback() {
    const dbm = dbmigrate.getInstance(true, {
      config: path.resolve('./database.json'),
      env: process.env.NODE_ENV || 'dev',
    });
    await dbm.down();
    console.log('Migration rollback executed successfully');
  }
}

export class MigrationServiceProvider implements Provider<MigrationService> {
  constructor(
    @inject('datasources.user')
    private dataSource: DataSource,
  ) {}

  value() {
    return new MigrationService(this.dataSource);
  }
}
```

---

### 5. Create a `database.json` File in the Root

```json
{
  "dev": {
    "driver": "pg",
    "host": "localhost",
    "database": "demoDB",
    "user": "postgres",
    "password": "password",
    "port": 5432
  }
}
```

---

### 6. Update `package.json`

#### Add Scripts

```json
"scripts": {
  "migrate:create": "db-migrate create",
  "migrate": "npm run build && db-migrate up",
  "migrate:down": "db-migrate down"
}
```

#### Add Dependencies

```json
"dependencies": {
  "@loopback/sequelize": "^0.6.14",
  "db-migrate": "^0.11.14",
  "db-migrate-pg": "^1.5.2"
}
```

---

### 7. Create a Migration Folder

Create `src/migrations/` manually and write migration files such as:

**Example: `YYYYMMDDHHMMSS-create-cart.js`**

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

exports.up = function (db, callback) {
  db.createTable('Cart', {
    id: { type: 'string', primaryKey: true, notNull: true },
    userid: { type: 'string', notNull: true },
    productsid: { type: 'string', notNull: true }, // Store JSON string
  }, callback);
};

exports.down = function (db, callback) {
  db.dropTable('Cart', callback);
};
```

> ✅ Manually sync your migration structure with your model definition.

---

### 8. Run the Migrations

Install packages and execute migration:

```bash
npm install
npm run migrate
```

This will apply all pending migration files from `src/migrations/` to the database defined in `database.json`.

---

### 9. Ignore Unused Directories

The following directories might be created automatically by `db-migrate`:

* `config/`
* `models/`
* `seeders/`

These are not used in the `@loopback/sequelize` setup and can be ignored.

---

### 10. Define DataSource Config

```ts
export const config = {
  name: 'cart',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'testdb'
};
```

> ⚠️ When using `@loopback/sequelize`, the database is selected from `database.json`, not this config file. This config serves as fallback or default for LoopBack internals.

---

## 🧪 Example Command Flow

```bash
npm run migrate:create migration_name
# Edit migration in src/migrations/
npm run migrate
```

---

## 📌 Final Notes

* Sequelize in LoopBack is a SourceFuse custom integration, so follow this structure strictly.
* All migrations must be manually written per model.
* Automating Sequelize model-to-migration sync is currently **not supported**.
* Always version your `migrations/` for reproducible deployments.

