const express = require("express");

const {
  getTasks,
  createTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.get(`/getTasks/:project/:f/:s/:o`, getTasks);

router.post(`/createTask/:project`, createTask);

router.put("/updateStatus/:project/:id", updateTaskStatus);

router.put("/updateTask/:project/:id", updateTask);

router.delete("/deleteTask/:project/:title", deleteTask);

module.exports = router;
