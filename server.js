const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let nextId = 1;

// Retrieve a list of all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Retrieve a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Create a new task
app.post('/tasks', (req, res) => {
  const task = {
    id: nextId++,
    ...req.body
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Update an existing task by ID
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    Object.assign(task, req.body);
    res.json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
