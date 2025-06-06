const mongoose = require("mongoose");

const TaskSchema = require("../models/taskModel");

const getTasks = async (req, res) => {
  let sort = {};
  let filter = { status: false };

  try {
    const Task = mongoose.model(
      req.params.project,
      TaskSchema,
      req.params.project
    );

    const order = req.params.o == "descending" ? 1 : -1;

    if (req.params.f != "true") {
      filter = {};
    }

    if (req.params.s !== "sort by...") {
      sort[req.params.s] = order;
    }

    const items = await Task.find(filter).sort(sort);

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const Task = mongoose.model(
      req.params.project,
      TaskSchema,
      req.params.project
    );

    const newTask = new Task({
      title: req.body.title,
      priority: req.body.priority,
      description: req.body.description,
      status: false,
      notes: req.body.notes,
      date: req.body.date,
    });

    await newTask.save();
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const Task = mongoose.model(
      req.params.project,
      TaskSchema,
      req.params.project
    );
    await Task.findOneAndUpdate(
      { _id: req.body._id },
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const Task = mongoose.model(
      req.params.project,
      TaskSchema,
      req.params.project
    );
    await Task.findOneAndUpdate(
      { _id: req.body._id },
      {
        title: req.body.title,
        priority: req.body.priority,
        description: req.body.description,
        notes: req.body.notes,
        date: req.body.date,
        status: req.body.status,
      },
      {
        new: true,
      }
    );
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const Task = mongoose.model(
      req.params.project,
      TaskSchema,
      req.params.project
    );
    await Task.deleteOne({
      title: req.params.title,
    });
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
};
