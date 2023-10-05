const express = require('express');
const mssql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// SQL Server database configuration
const config = {
  user: 'root',
  password: '',
  server: 'HMG',
  database: 'homemadegrubdb',
};

// Create a connection pool
const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

app.use(bodyParser.json());

// Create a new record (POST)
app.post('/dishes', async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const { name, description } = req.body;
    const result = await request.query(`INSERT INTO Dishes (Name, Description) VALUES ('${name}', '${description}')`);
    res.status(201).json({ message: 'Dish created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get all records (GET)
app.get('/dishes', async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const result = await request.query('SELECT * FROM Dishes');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update a record (PUT)
app.put('/dish/:id', async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const { name, description } = req.body;
    const result = await request.query(`UPDATE Dishes SET Name = '${name}', Description = '${description}' WHERE Id = ${req.params.id}`);
    res.json({ message: 'Item updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a record (DELETE)
app.delete('/dish/:id', async (req, res) => {
  try {
    await poolConnect;
    const request = pool.request();
    const result = await request.query(`DELETE FROM Dishes WHERE Id = ${req.params.id}`);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

