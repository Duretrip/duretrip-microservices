-- Create databases
CREATE DATABASE auth_dbb;
CREATE DATABASE jet_db;
CREATE DATABASE hotel_db;

-- Create users and grant privileges
CREATE USER "dureauth" WITH ENCRYPTED PASSWORD 'dureAuth2023';
GRANT ALL PRIVILEGES ON DATABASE auth_dbb TO "dureauth";

-- Create users and grant privileges
CREATE USER "durejet" WITH ENCRYPTED PASSWORD 'dureJet2023';
GRANT ALL PRIVILEGES ON DATABASE jet_db TO "durejet";

-- Create users and grant privileges
CREATE USER "durehotel" WITH ENCRYPTED PASSWORD 'dureHotel2023';
GRANT ALL PRIVILEGES ON DATABASE hotel_db TO "durehotel";

-- -- init.sql

-- -- Create Database and User for db1
-- CREATE DATABASE db1;
-- CREATE USER db1_user WITH PASSWORD 'db1_password';
-- ALTER ROLE db1_user SET client_encoding TO 'utf8';
-- ALTER ROLE db1_user SET default_transaction_isolation TO 'read committed';
-- ALTER ROLE db1_user SET timezone TO 'UTC';
-- GRANT ALL PRIVILEGES ON DATABASE db1 TO db1_user;

-- -- Create Database and User for db2
-- CREATE DATABASE db2;
-- CREATE USER db2_user WITH PASSWORD 'db2_password';
-- ALTER ROLE db2_user SET client_encoding TO 'utf8';
-- ALTER ROLE db2_user SET default_transaction_isolation TO 'read committed';
-- ALTER ROLE db2_user SET timezone TO 'UTC';
-- GRANT ALL PRIVILEGES ON DATABASE db2 TO db2_user;

-- -- Create Database and User for db3
-- CREATE DATABASE db3;
-- CREATE USER db3_user WITH PASSWORD 'db3_password';
-- ALTER ROLE db3_user SET client_encoding TO 'utf8';
-- ALTER ROLE db3_user SET default_transaction_isolation TO 'read committed';
-- ALTER ROLE db3_user SET timezone TO 'UTC';
-- GRANT ALL PRIVILEGES ON DATABASE db3 TO db3_user;
