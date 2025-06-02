# ECommerceBackend Documentation

## Overview
The ECommerceBackend is a monorepo project managed with Lerna, containing 8 lb4 microservices and 1 lb4 ecommerce that work together to provide e-commerce functionality. This documentation outlines the workflow and architecture of each microservice.

## Monorepo Structure
The project uses Lerna for monorepo management with the following structure:
```
ECommerceBackend_Activity_20/

├── facade/ecommerce/  # Facade(api aggregator)
├── packages/
│   ├── auth/          # Authentication service
│   ├── cart/          # Shopping cart service
│   ├── category/      # Product category service
│   ├── product/       # Product management service
│   ├── order/         # Order processing service
│   ├── orderitem/     # Order item service
│   ├── oauth/         # OAuth service
│   └── notify/        # Notification service
```

## Microservices Workflow

### 1. Auth Service
**Purpose**: Handles user authentication and authorization

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS public."user" (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE, -- username
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    permissions TEXT[] DEFAULT ARRAY['2'], -- 2 for notification
    google_user_id TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS public.refreshtoken (
    token TEXT NOT NULL,
    userId INTEGER NOT NULL,
    expiresAt TEXT NOT NULL,
    createdAt TEXT DEFAULT now()::TEXT,
    CONSTRAINT refreshtoken_pkey PRIMARY KEY (token)
);
```

**Key Features**:
- HTTP Bearer authentication using ARC by SourceFuse
- Refresh token implementation for secure session management
- Role-based access control
- Google OAuth integration (via google_user_id field, in case of http-bearer it will be '' and in case of running oauth service 'id' provided by google will be stored.)

**Workflow**:
1. User registers with name(username), email, and password
2. System creates user record with default permissions
3. On login, system generates access token and refresh token
4. Refresh tokens are stored in the database for session management
5. Logout functionality invalidates refresh tokens

### 2. Cart Service
**Purpose**: Manages user shopping carts

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS public.cart (
    id TEXT NOT NULL,  
    userId TEXT NOT NULL,
    productsId TEXT[] NOT NULL,
    CONSTRAINT cart_pkey PRIMARY KEY (id)
);
```

**Key Features**:
- Persistent cart storage
- Support for multiple products in cart
- User-specific cart management
- One cart will be provided for each user

**Workflow**:
1. User adds product to cart
2. System creates/updates cart record with product IDs array
3. Cart persists between sessions
4. Cart contents transferred to order during checkout and get saved into orderitem and cart will be cleared

### 3. Category Service
**Purpose**: Manages product categories

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS public.category (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    imageUrl TEXT,
    description TEXT
);
```

**Key Features**:
- Category hierarchy management
- Image and description support
- Product categorization
- Seeder also added for some initial data

### 4. Product Service
**Purpose**: Manages product catalog

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS public.product (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC NOT NULL,
    discount NUMERIC NOT NULL,
    images TEXT[] NOT NULL,
    categoryId TEXT NOT NULL,
    brandId TEXT NOT NULL,
    stock INTEGER NOT NULL
);
```

**Key Features**:
- Product details management
- Multiple images support
- Pricing and discount management
- Inventory tracking
- Category and brand associations
- Seeder also added for some initial data

### 5. Order Service
**Purpose**: Handles order processing

**Database Schema**:
```sql
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
```

**Key Features**:
- Comprehensive order tracking
- Financial calculations (subtotal, tax, shipping, discounts)
- Shipping management
- Status tracking throughout order lifecycle

### 6. OrderItem Service
**Purpose**: Manages individual items within orders

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS public.orderitem (
    id TEXT PRIMARY KEY,
    productsId TEXT[] NOT NULL
);
```

**Key Features**:
- Links orders to specific products
- Supports multiple products per order item
- Enables detailed order breakdowns
- A Backup of Cart data

### 7. OAuth Service
**Purpose**: Provides OAuth 2.0 authentication capabilities

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS main.auth_clients (
	id                   integer  NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	client_id            varchar(150)  NOT NULL ,
	client_secret        text  NOT NULL ,
	redirect_url         varchar(200)   ,
	access_token_expiration integer DEFAULT 900 NOT NULL ,
	refresh_token_expiration integer DEFAULT 86400 NOT NULL ,
	auth_code_expiration integer DEFAULT 180 NOT NULL ,
	secret               text  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	deleted_on           timestamptz   ,
	deleted_by           uuid   ,
	created_by		     varchar(100),
	modified_by          varchar(100),
	client_type          varchar(100),
	CONSTRAINT pk_auth_clients_id PRIMARY KEY ( id )
 );

 CREATE TABLE IF NOT EXISTS main.roles (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	name                 varchar(100)  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           uuid   ,
	modified_by          uuid   ,
	deleted              bool DEFAULT false NOT NULL ,
	permissions          text[]   ,
	role_type            integer DEFAULT 0 NOT NULL ,
	deleted_by           uuid   ,
	deleted_on           timestamptz   ,
	tenant_id			uuid   ,
	allowed_clients      text[]
	description          text   ,
	CONSTRAINT pk_roles_id PRIMARY KEY ( id )
 );

 CREATE TABLE IF NOT EXISTS main.tenants (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	name                 varchar(100)  NOT NULL ,
	status               integer DEFAULT 0 NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           uuid   ,
	modified_by          uuid   ,
	deleted              bool DEFAULT false NOT NULL ,
	"key"                varchar(20)  NOT NULL ,
	address              varchar(500)   ,
	city                 varchar(100)   ,
	"state"              varchar(100)   ,
	zip                  varchar(25)   ,
	country              varchar(25)   ,
	deleted_on           timestamptz   ,
	deleted_by           uuid   ,
	website             varchar(100)   ,
	CONSTRAINT pk_tenants_id PRIMARY KEY ( id ),
	CONSTRAINT idx_tenants UNIQUE ( "key" )
 );

 CREATE TABLE IF NOT EXISTS main.tenant_configs (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	config_key           varchar(100)  NOT NULL ,
	config_value         jsonb  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           integer   ,
	modified_by          integer   ,
	deleted              bool DEFAULT false NOT NULL ,
	tenant_id            uuid  NOT NULL ,
	deleted_by           uuid   ,
	deleted_on           timestamptz   ,
	CONSTRAINT pk_tenant_configs_id PRIMARY KEY ( id ),
    CONSTRAINT fk_tenant_configs_tenants FOREIGN KEY ( tenant_id ) REFERENCES main.tenants( id )

 );


CREATE TABLE IF NOT EXISTS main.users (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	first_name           varchar(50)  NOT NULL ,
	middle_name          varchar(50)   ,
	last_name            varchar(50)   ,
	username             varchar(150)  NOT NULL ,
	email                varchar(150)   ,
	phone                varchar(15)   ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           uuid   ,
	modified_by          uuid   ,
	deleted              bool DEFAULT false NOT NULL ,
	last_login           timestamptz   ,
	auth_client_ids      integer[]   ,
	gender               char(1)   ,
	dob                  date   ,
	default_tenant_id    uuid   ,
	deleted_by           uuid   ,
	deleted_on           timestamptz   ,
	photo_url            varchar(200)   ,
	designation          varchar(50)   ,
	CONSTRAINT pk_users_id PRIMARY KEY ( id )
 );

CREATE TABLE IF NOT EXISTS main.user_credentials (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	user_id              uuid  NOT NULL ,
	auth_provider        varchar(50) DEFAULT 'internal'::character varying NOT NULL ,
	auth_id              varchar(100)   ,
	auth_token           varchar(100)   ,
	"password"           varchar(60)   ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	deleted_on           timestamptz   ,
	deleted_by           uuid   ,
	secret_key		   varchar(100)   ,
	created_by         varchar(100),
	modified_by          varchar(100),
	CONSTRAINT pk_user_credentials_id PRIMARY KEY ( id ),
	CONSTRAINT idx_user_credentials_user_id UNIQUE ( user_id ),
	CONSTRAINT idx_user_credentials_uniq UNIQUE ( auth_provider, auth_id, auth_token, "password" ),
	CONSTRAINT fk_user_credentials_users FOREIGN KEY ( user_id ) REFERENCES main.users( id )
 );

 CREATE TABLE IF NOT EXISTS main.user_tenants (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	user_id              uuid  NOT NULL ,
	tenant_id            uuid  NOT NULL ,
	role_id              uuid  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	deleted              bool DEFAULT false NOT NULL ,
	status               integer DEFAULT 0 NOT NULL ,
	locale               varchar(5)   ,
	deleted_by           uuid   ,
	deleted_on           timestamptz   ,
	created_by         varchar(100),
	modified_by          varchar(100),
	CONSTRAINT pk_user_tenants_id PRIMARY KEY ( id ),
	CONSTRAINT fk_user_tenants_users FOREIGN KEY ( user_id ) REFERENCES main.users( id )   ,
	CONSTRAINT fk_user_tenants_tenants FOREIGN KEY ( tenant_id ) REFERENCES main.tenants( id )   ,
	CONSTRAINT fk_user_tenants_roles FOREIGN KEY ( role_id ) REFERENCES main.roles( id )
 );

 CREATE TABLE IF NOT EXISTS main.user_permissions (
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	user_tenant_id       uuid  NOT NULL ,
	permission           text  NOT NULL ,
	allowed              bool  NOT NULL ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           uuid   ,
	modified_by          uuid   ,
	deleted              bool DEFAULT false NOT NULL ,
	deleted_on           timestamptz   ,
	deleted_by           uuid   ,
	CONSTRAINT pk_user_permissions_id PRIMARY KEY ( id ),
	CONSTRAINT fk_user_permissions FOREIGN KEY ( user_tenant_id ) REFERENCES main.user_tenants( id )

 );

CREATE TABLE IF NOT EXISTS main.user_resources (
	deleted              bool DEFAULT false NOT NULL ,
	deleted_on           timestamptz   ,
	deleted_by           uuid   ,
	created_on           timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	modified_on          timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL ,
	created_by           uuid   ,
	modified_by          uuid   ,
	id                   uuid DEFAULT md5(random()::text || clock_timestamp()::text)::uuid NOT NULL ,
	user_tenant_id       uuid ,
	resource_name        varchar(50)   ,
	resource_value       varchar(100)   ,
	allowed              bool DEFAULT true NOT NULL ,
	CONSTRAINT user_resources_pkey PRIMARY KEY ( id ),
	CONSTRAINT fk_user_resources FOREIGN KEY ( user_tenant_id ) REFERENCES main.user_tenants( id )

 );

```

**Key Features**:
- Client credential management
- Token expiration configuration
- Role-based access control
- Multi-tenant support
- User authentication tracking

### 8. Notify Service
**Purpose**: Handles system notifications

**Database Schema**:
```sql
CREATE TABLE main.notification_users (
    id uuid PRIMARY KEY,
    notification_id uuid NOT NULL,
    user_id uuid NOT NULL,
    is_read boolean DEFAULT false,
    action_meta text,
    is_draft boolean DEFAULT false
);

CREATE TABLE main.notifications (
    id uuid PRIMARY KEY,
    subject varchar(100),
    body varchar(1000) NOT NULL,
    receiver json NOT NULL,
    "type" integer NOT NULL,
    sent timestamptz,
    "options" text,
    is_draft boolean DEFAULT false,
    is_critical boolean DEFAULT false,
    group_key varchar(100)
);
```
---
More actions
{
  "subject": "string",
  "body": "Kindly Don't Reply to this email",
  "receiver": {"to":[{"id":"vinay.gupta@sourcefuse.com"}]},
  "type": 1,
  "sentDate": "2025-05-16T08:46:08.597Z",
  "options": {"id":"vinay.gupta@sourcefuse.com","to":"vinay.gupta@sourcefuse.com","from":"abhisheksingh55568@gmail.com","subject":"Testing case","body":"Kindly Don't Reply to this email"},
  "groupKey": "string",
  "isCritical": true
}



reduced one is

 {
  "subject": "string",
  "body": "Kindly Don't Reply to this email, er rt",
  "receiver": {"to":[{"id":"vinay.gupta@sourcefuse.com"}]},
  "type": 1,
  "options": {"to":"vinay.gupta@sourcefuse.com","from":"abhisheksingh55568@gmail.com","subject":"Testing case"},
  "isCritical": trueAdd commentMore actions
}
---

**Key Features**:
- User-specific notifications
- Read status tracking
- Draft notifications
- Critical notifications flag
- Grouped notifications
- Permission '2' needed into accessToken

## Common Technical Stack
- **Database**: PostgreSQL
- **ORM**: Sequelize (@loopbacl/sequelize provided by arc)
- **Authentication**: HTTP Bearer (ARC by SourceFuse)
- **Monorepo Management**: Lerna
- **API Style**: RESTful

## Workflow Integration
1. **User Flow**:
   - Auth service handles authentication
   - OAuth service provides token management for google authentication
   - User actions trigger notifications via Notify service

2. **Order Flow**:
   - Products selected via Product service
   - Items added to cart via Cart service
   - Checkout creates order via Order service
   - Order items tracked via OrderItem service

3. **Administration Flow**:
   - Categories managed via Category service
   - Products managed via Product service
   - System-wide notifications via Notify service

## Deployment Considerations
- Backend should be deployed as single monorepo 
- Authentication tokens must be validated across services
- Facade helps to inter-service communication

