const express = require("express");

const PORT = 8000;
const server = express();

server.use(express.json());

server.get("/api/v1/health", (req, res) => {
    return res.status(200).json({ status: "OK", message: "Hello, World: The server is up and running!" });
});

const db = {
    tasks: []
};

// Fetch All Tasks
server.get("/api/v1/tasks", (req, res) => {
    const tasks = db.tasks;
    return res.status(200).json({ tasks });
});

// Create Task API
server.post("/api/v1/tasks", (req, res) => {
    const payload = req.body;

    const task = {
        id: db.tasks.length + 1,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        status: payload.status
    };
    db.tasks.push(task);

    return res.status(201).json({ task });
});

// Update Task API
server.put("/api/v1/tasks/:taskId", (req, res) => {
    const payload = req.body;

    const taskIndex = db.tasks.findIndex(task => task.id === parseInt(req.params.taskId));
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Error: Task ID is not found." })
    }

    db.tasks[taskIndex] = {
        ...db.tasks[taskIndex],
        dueDate: payload.dueDate,
        status: payload.status
    };

    const updatedTask = db.tasks[taskIndex];
    return res.status(200).json({ task: updatedTask })
});

// Delete Task API
server.delete("/api/v1/tasks/:taskId", (req, res) => {
    const taskIndex = db.tasks.findIndex(task => task.id === parseInt(req.params.taskId));
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Error: Task ID is not found." })
    }

    db.tasks = db.tasks.filter(task => task.id !== parseInt(req.params.taskId));
    return res.status(200).json({ tasks: db.tasks })
});

// TODO APP:
// - User will Sign Up / Sign In [POST]
// - User will Add a Task [POST]
// - User will Update a Task [PUT]
// - User will Delete a Task [DELETE]
// - User will Fetch All Tasks [GET]

server.listen(PORT, () => {
    console.log(`[server] listening on port: ${PORT}`);
});