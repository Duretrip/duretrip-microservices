-- Create databases
CREATE DATABASE auth_db;
CREATE DATABASE jet_db;
CREATE DATABASE hotel_db;

-- Create users and grant privileges
CREATE USER 'dureauth'@'%' IDENTIFIED BY '${PASSWORDE}';
GRANT ALL PRIVILEGES ON auth_db.* TO 'user'@'%';

-- Create users and grant privileges
CREATE USER 'durejet'@'%' IDENTIFIED BY '${PASSWORDE}';
GRANT ALL PRIVILEGES ON jet_db.* TO 'user'@'%';

-- Create users and grant privileges
CREATE USER 'durehotel'@'%' IDENTIFIED BY '${PASSWORDE}';
GRANT ALL PRIVILEGES ON hotel_db.* TO 'user'@'%';
