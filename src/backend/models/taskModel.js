const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
});

module.exports = TaskSchema;
