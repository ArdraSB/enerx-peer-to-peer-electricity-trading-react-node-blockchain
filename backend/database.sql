CREATE DATABASE enerx;
CREATE TABLE users(id varchar(13) PRIMARY KEY,FirstName varchar(25),LastName varchar(25),MeterId varchar(20),WalletId varchar(30),Password varchar(50),DOJ DATE DEFAULT DATE(NOW()) );
CREATE TABLE otp(id varchar(13) PRIMARY KEY,otp varchar(6),verified varchar(3));
postgresql