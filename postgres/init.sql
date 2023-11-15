-- Create users and grant privileges
CREATE DATABASE auth_db;
CREATE USER "dureauth" WITH ENCRYPTED PASSWORD 'dureAuth2023';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO "dureauth";
ALTER USER "dureauth" WITH CREATEDB;
GRANT ALL PRIVILEGES ON SCHEMA public TO dureauth;

-- GRANT USAGE ON SCHEMA public TO dureauth;

-- Create users and grant privileges
CREATE DATABASE jet_db;
CREATE USER "durejet" WITH ENCRYPTED PASSWORD 'dureJet2023';
GRANT ALL PRIVILEGES ON DATABASE jet_db TO "durejet";
ALTER USER "durejet" WITH CREATEDB;
GRANT ALL PRIVILEGES ON SCHEMA public TO durejet;
-- GRANT USAGE ON SCHEMA public TO durejet;

-- Create users and grant privileges
CREATE DATABASE hotel_db;
CREATE USER "durehotel" WITH ENCRYPTED PASSWORD 'dureHotel2023';
GRANT ALL PRIVILEGES ON DATABASE hotel_db TO "durehotel";
ALTER USER "durehotel" WITH CREATEDB;
GRANT ALL PRIVILEGES ON SCHEMA public TO durehotel;
-- GRANT USAGE ON SCHEMA public TO durejet;
