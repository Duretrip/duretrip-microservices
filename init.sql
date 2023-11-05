-- Set the bind-address to allow remote connections
SET GLOBAL sql_mode = 'NO_ENGINE_SUBSTITUTION';
SET GLOBAL bind_address = '0.0.0.0';

-- Create databases
CREATE DATABASE auth_db;
CREATE DATABASE auth2_db;
-- CREATE DATABASE database3;

-- Create users and grant privileges
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON auth_db.* TO 'user'@'%';

-- Create users and grant privileges
CREATE USER 'Zijela'@'%' IDENTIFIED BY 'Zijela@2023';
GRANT ALL PRIVILEGES ON auth2_db.* TO 'Zijela'@'%';

-- CREATE USER 'paymentuser'@'%' IDENTIFIED BY 'user2_password';
-- GRANT ALL PRIVILEGES ON database2.* TO 'user2'@'%';
