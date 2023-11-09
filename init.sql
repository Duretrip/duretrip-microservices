-- Create databases
CREATE DATABASE auth_db;
CREATE DATABASE jet_db;
CREATE DATABASE hotel_db;

-- Create users and grant privileges
CREATE USER "dureauth" WITH ENCRYPTED PASSWORD 'dureAuth2023';
GRANT ALL PRIVILEGES ON DATABASE auth_db TO "dureauth";

-- Create users and grant privileges
CREATE USER "durejet" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE jet_db TO "durejet";

-- Create users and grant privileges
CREATE USER "durehotel" WITH ENCRYPTED PASSWORD '${PASSWORDE}';
GRANT ALL PRIVILEGES ON DATABASE hotel_db TO "durehotel";
