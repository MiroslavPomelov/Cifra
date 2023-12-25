CREATE TABLE users(
userid INT PRIMARY KEY,
username VARCHAR(50) UNIQUE,
firstname VARCHAR(50),
lastname VARCHAR(50),
age INT,
email VARCHAR(50));

INSERT INTO users(userid,username, firstname, lastname, age, email) VALUES(1,'Meros','Miroslav', 'Pomelov','24', 'mail@mail.ru'),(2,'Mal','Slava', 'Mohin','32', 'mail32@mail.ru'),(3,'Kolyan','Nikolay', 'Ivanov','40', 'mailssss@mail.ru');

SELECT * FROM users;

CREATE TABLE fruits(
fruitid INT PRIMARY KEY,
fruitname VARCHAR(50),
variety VARCHAR(50)  UNIQUE,
color VARCHAR(50),
taste VARCHAR(50));


INSERT INTO fruits(fruitid,fruitname, variety, color, taste) VALUES(1,'Apple', 'variety','green', 'tasty'),(2,'Orange', 'variety2','yellow', 'sweet'),(3,'Lemon', 'hhh','yellow', 'sour');

SELECT * FROM fruits;

CREATE TABLE userfruits(
userfruitid INT PRIMARY KEY,
userid INT REFERENCES users (userid) ,
fruitid INT REFERENCES fruits (fruitid));

SELECT * FROM userfruits;fruits

SELECT * FROM users;