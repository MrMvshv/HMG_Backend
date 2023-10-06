const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Root',
  database: 'homemadegrub'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Dishes CRUD Endpoints

// Get all dishes
app.get('/dishes', (req, res) => {
  connection.query('SELECT * FROM dishes', (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// Get a dish by ID
app.get('/dishes/:dishId', (req, res) => {
  const dishId = req.params.dishId;
  connection.query('SELECT * FROM dishes WHERE dish_id = ?', [dishId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results[0]);
  });
});

// Create a new dish
app.post('/dishes', (req, res) => {
  const newDish = req.body;
  connection.query('INSERT INTO dishes SET ?', newDish, (error, results) => {
    if (error) throw error;
    res.status(201).json({ message: 'Dish created successfully', dishId: results.insertId });
  });
});

// Update a dish by ID
app.put('/dishes/:dishId', (req, res) => {
  const dishId = req.params.dishId;
  const updatedDish = req.body;
  connection.query('UPDATE dishes SET ? WHERE dish_id = ?', [updatedDish, dishId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Dish updated successfully' });
  });
});

// Delete a dish by ID
app.delete('/dishes/:dishId', (req, res) => {
  const dishId = req.params.dishId;
  connection.query('DELETE FROM dishes WHERE dish_id = ?', [dishId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Dish deleted successfully' });
  });
});

// orders Endpoints
// Get all orders
app.get('/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// Get an order by ID
app.get('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  connection.query('SELECT * FROM orders WHERE order_id = ?', [orderId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results[0]);
  });
});

// Create a new order
app.post('/orders', (req, res) => {
  const newOrder = req.body;
  connection.query('INSERT INTO orders SET ?', newOrder, (error, results) => {
    if (error) throw error;
    res.status(201).json({ message: 'Order created successfully', orderId: results.insertId });
  });
});

// Update an order by ID
app.put('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;
  connection.query('UPDATE orders SET ? WHERE order_id = ?', [updatedOrder, orderId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Order updated successfully' });
  });
});

// Delete an order by ID
app.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  connection.query('DELETE FROM orders WHERE order_id = ?', [orderId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'Order deleted successfully' });
  });
});

// users Endpoints
// Get all users based on user type
app.get('/users/:userType', (req, res) => {
  const userType = req.params.userType;
  connection.query('SELECT * FROM users WHERE user_type = ?', [userType], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// Get a user by ID and user type
app.get('/users/:userType/:userId', (req, res) => {
  const userType = req.params.userType;
  const userId = req.params.userId;
  connection.query('SELECT * FROM users WHERE user_id = ? AND user_type = ?', [userId, userType], (error, results) => {
    if (error) throw error;
    res.status(200).json(results[0]);
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
    if (error) throw error;
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
});

// Update a user by ID and user type
app.put('/users/:userType/:userId', (req, res) => {
  const userType = req.params.userType;
  const userId = req.params.userId;
  const updatedUser = req.body;
  connection.query('UPDATE users SET ? WHERE user_id = ? AND user_type = ?', [updatedUser, userId, userType], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'User updated successfully' });
  });
});

// Delete a user by ID and user type
app.delete('/users/:userType/:userId', (req, res) => {
  const userType = req.params.userType;
  const userId = req.params.userId;
  connection.query('DELETE FROM users WHERE user_id = ? AND user_type = ?', [userId, userType], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

