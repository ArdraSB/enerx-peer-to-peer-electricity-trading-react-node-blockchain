CREATE DATABASE enerx;
CREATE TABLE users(id varchar(13) PRIMARY KEY,First_Name varchar(25),Last_Name varchar(25),meter_id varchar(20),password varchar(50),Date_Joined DATE DEFAULT DATE(NOW()) );
CREATE TABLE otp(id varchar(13) PRIMARY KEY,otp varchar(6),verified varchar(3));