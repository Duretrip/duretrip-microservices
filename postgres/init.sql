-- Create users and grant privileges
CREATE DATABASE auth_db;
CREATE USER "dureauth" WITH ENCRYPTED PASSWORD 'dureAuth2023';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO "dureauth";
ALTER USER "dureauth" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO dureauth;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO dureauth;
-- GRANT USAGE ON SCHEMA public TO dureauth;

-- Create users and grant privileges
CREATE DATABASE jet_db;
CREATE USER "durejet" WITH ENCRYPTED PASSWORD 'dureJet2023';
GRANT ALL PRIVILEGES ON DATABASE jet_db TO "durejet";
ALTER USER "durejet" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durejet;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durejet;

-- Create hotel user and grant privileges
CREATE DATABASE hotel_db;
CREATE USER "durehotel" WITH ENCRYPTED PASSWORD 'dureHotel2023';
GRANT ALL PRIVILEGES ON DATABASE hotel_db TO "durehotel";
ALTER USER "durehotel" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durehotel;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durehotel;

-- Create booking user and grant privileges
CREATE DATABASE booking_db;
CREATE USER "durebooking" WITH ENCRYPTED PASSWORD 'dureBooking2023';
GRANT ALL PRIVILEGES ON DATABASE booking_db TO "durebooking";
ALTER USER "durebooking" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durebooking;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durebooking;

-- Create payment user and grant privileges
CREATE DATABASE payment_db;
CREATE USER "durepayment" WITH ENCRYPTED PASSWORD 'durePayment2023';
GRANT ALL PRIVILEGES ON DATABASE payment_db TO "durepayment";
ALTER USER "durepayment" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durepayment;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durepayment;
-- Create hotel user and grant privileges
CREATE DATABASE integrations_db;
CREATE USER "dureintegrations" WITH ENCRYPTED PASSWORD 'dureIntegrations2023';
GRANT ALL PRIVILEGES ON DATABASE integrations_db TO "integrations_db";
ALTER USER "dureintegrations" WITH CREATEDB;
GRANT ALL ON SCHEMA public TO durehotel;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO durehotel;
