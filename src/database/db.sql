# CREATE DATABASE IF NOT EXISTS summertime;
CREATE DATABASE summertime;

USE summertime;

# CREATE TABLE IF NOT EXISTS travel (
CREATE TABLE travel (
 id INT AUTO_INCREMENT,
 DepartureDate DATE,
 BookingNumber INT PRIMARY KEY,
 TO_Name VARCHAR(255),
 FlightNumber VARCHAR(255),
 FlightDepTime TIME,
 PickUpTime TIME,
 PickupDate DATE,
 Hotel VARCHAR(255),
 PickupPoint VARCHAR(255),
 ServiceType VARCHAR(255),
 FlyFrom VARCHAR(255),
 FlyTo VARCHAR(255),
 LANGUAGE VARCHAR(255)
);