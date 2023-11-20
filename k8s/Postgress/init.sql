-- Create auth user and grant privileges
CREATE DATABASE auth_db;
CREATE USER "dureauth" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO "dureauth";
ALTER USER "dureauth" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO dureauth;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO dureauth;
-- GRANT USAGE ON SCHEMA public TO dureauth;

-- Create jet user and grant privileges
CREATE DATABASE jet_db;
CREATE USER "durejet" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE jet_db TO "durejet";
ALTER USER "durejet" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durejet;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durejet;

-- Create hotel user and grant privileges
CREATE DATABASE hotel_db;
CREATE USER "durehotel" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE hotel_db TO "durehotel";
ALTER USER "durehotel" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durehotel;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durehotel;

-- Create hotel user and grant privileges
CREATE DATABASE integrations_db;
CREATE USER "dureintegrations" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE integrations_db TO "integrations_db";
ALTER USER "dureintegrations" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durehotel;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durehotel;
