const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// Get all todos
router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json({ todos });
});

// Add new todo
router.post("/todo", async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description });
  res.json(todo);
});

// Mark as completed
router.put("/completed", async (req, res) => {
  const { id } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, { completed: true }, { new: true });
  res.json(updated);
});
// server/routes/todos.js or similar
router.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const updated = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo updated', todo: updated });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Delete todo
router.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
