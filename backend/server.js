const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const password = encodeURIComponent("harry@12345");

// Connect to MongoDB
mongoose.connect(
  `mongodb+srv://1laurelverma:${password}@cluster0.wdrp3wb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);

// Define routes and middleware
// Add this to server.js
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});
// Update an existing todo
app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTodo);
});
// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id);
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
