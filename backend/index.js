const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { Pool } = require("pg")

const app = express()
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tutam-sbd10-two.vercel.app"
  ]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT DEFAULT 'medium',
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
  )
`).then(() => console.log("Table ready"))
  .catch(err => console.error(err))

app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY created_at DESC")
    res.json({ success: true, data: result.rows })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

app.post("/todos", async (req, res) => {
  try {
    const { title, description, priority } = req.body
    console.log("body:", req.body)
    const result = await pool.query(
      "INSERT INTO todos (title, description, priority) VALUES ($1, $2, $3) RETURNING *",
      [title, description || null, priority || 'medium']
    )
    res.status(201).json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    await pool.query("DELETE FROM todos WHERE id = $1", [id])
    res.json({ success: true, message: "Todo deleted" })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { completed } = req.body
    const result = await pool.query(
      "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    )
    res.json({ success: true, data: result.rows[0] })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))