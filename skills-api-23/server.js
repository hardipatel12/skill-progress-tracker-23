const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

// Parse JSON request bodies
app.use(express.json());

// In-memory skills data
let skills = [
    {
        id: 1,
        title: "React.js",
        completed: true
    },
    {
        id: 2,
        title: "Node.js",
        completed: false
    },
    {
        id: 3,
        title: "Express.js",
        completed: false
    }
];

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


// GET /skills - Get all skills
app.get("/skills", (req, res) => {
    res.status(200).json(skills);
});


// POST /skills - Add a new skill
app.post("/skills", (req, res) => {
    const { title, completed } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    const newSkill = {
        id: skills.length > 0 ? skills[skills.length - 1].id + 1 : 1,
        title: title,
        completed: completed ?? false
    };

    skills.push(newSkill);

    res.status(201).json(newSkill);
});


// PUT /skills/:id - Update a skill
app.put("/skills/:id", (req, res) => {
    const id = Number(req.params.id);
    const skill = skills.find((item) => item.id === id);

    if (!skill) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        skill.title = title;
    }

    if (completed !== undefined) {
        skill.completed = completed;
    }

    res.status(200).json(skill);
});


// DELETE /skills/:id - Delete a skill
app.delete("/skills/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = skills.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Skill not found"
        });
    }

    const deletedSkill = skills.splice(index, 1);

    res.status(200).json({
        message: "Skill deleted successfully",
        skill: deletedSkill[0]
    });
});


// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// Global error handler - must be last
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});