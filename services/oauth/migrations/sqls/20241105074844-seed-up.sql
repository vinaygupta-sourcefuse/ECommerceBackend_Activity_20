-- Insert dummy data into auth_clients table


-- Change the client_id and client_secret with actual some also save into .env



INSERT INTO main.auth_clients (id,client_id, client_secret, redirect_url, access_token_expiration, refresh_token_expiration, auth_code_expiration, secret)
VALUES
(1,'client1', 'secret1', 'http://localhost:4200/home', 900, 86400, 180, 'secret1');

-- Insert dummy data into tenants table
INSERT INTO main.tenants (name, status, "key", address, city, "state", zip, country)
VALUES
('Tenant 1', 0, 'master', '123 Main St', 'New York', 'NY', '10001', 'USA');

-- Insert dummy data into roles table
INSERT INTO main.roles (name, role_type, permissions, tenant_id)
VALUES
('admin', 0, ARRAY['CREATE', 'READ', 'UPDATE', 'DELETE','2']::text[], (SELECT id FROM main.tenants WHERE "key" = 'master'));
