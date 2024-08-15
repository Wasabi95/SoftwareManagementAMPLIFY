import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

app.post("/employees", (req, res) => {
  const { firstName, lastName, email, salary, date } = req.body;
  const sql = "INSERT INTO employees (firstName, lastName, email, salary, date) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [firstName, lastName, email, salary, date], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, firstName, lastName, email, salary, date });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Employee deleted" });
  });
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, salary, date } = req.body;
  const sql = "UPDATE employees SET firstName = ?, lastName = ?, email = ?, salary = ?, date = ? WHERE id = ?";
  db.query(sql, [firstName, lastName, email, salary, date, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Employee updated" });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
