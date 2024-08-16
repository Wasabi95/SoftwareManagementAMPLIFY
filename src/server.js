import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const port = 5000;

// In Express server (server.js)
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  

app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wasabito1223$', // Your database password
  database: 'gestion_empleados' // Your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected...');
});

// Create a record
app.post('/empleados', (req, res) => {
  const { nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario } = req.body;
  const sql = 'INSERT INTO empleados (nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario });
  });
});

// Read all records
app.get('/empleados', (req, res) => {
  const sql = 'SELECT * FROM empleados';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Read a single record
app.get('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM empleados WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update a record
app.put('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario } = req.body;
  const sql = 'UPDATE empleados SET nombre = ?, apellido = ?, email = ?, telefono = ?, fecha_contratacion = ?, puesto = ?, departamento_id = ?, salario = ? WHERE id = ?';
  db.query(sql, [nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario, id], (err) => {
    if (err) throw err;
    res.json({ id, nombre, apellido, email, telefono, fecha_contratacion, puesto, departamento_id, salario });
  });
});

// Delete a record
app.delete('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM empleados WHERE id = ?';
  db.query(sql, [id], (err) => {
    if (err) throw err;
    res.status(204).end();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
