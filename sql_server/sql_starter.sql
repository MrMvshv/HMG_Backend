-- Create a new SQL db
CREATE DATABASE IF NOT EXISTS homemadegrubdb;
USE homemadegrubdb;

-- Create tables with placeholders for columns
CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY AUTOINCREMENT,
    Username TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Dishes (
    DishID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    ChefID INTEGER,
    FOREIGN KEY (ChefID) REFERENCES Chefs(ChefID)
);

CREATE TABLE IF NOT EXISTS Chefs (
    ChefID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL
);

-- Insert sample data (optional)
INSERT INTO Users (Username, Email, Password) VALUES
    ('user1', 'user1@example.com', 'password123'),
    ('user2', 'user2@example.com', 'password456');

INSERT INTO Chefs (Name) VALUES
    ('Chef1'),
    ('Chef2'),

INSERT INTO Dishes (Name, Description, Price, CategoryID) VALUES
    ('Pilau', 'Tamu', 999.99, 1),





-- etc

-- Create relationships (foreign keys) between tables
-- ALTER TABLE statements can be used to add constraints after table creation

-- Example: Add a foreign key constraint to Products table
-- ALTER TABLE Products
-- ADD CONSTRAINT FK_Category_Product
-- FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID);
