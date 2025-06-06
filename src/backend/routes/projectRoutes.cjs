const express = require("express");

const {
  getProjects,
  createProject,
  updateProject,
  deleteProejct,
} = require("../controllers/projectControllers");

const router = express.Router();

router.get("/getProjects", getProjects);

router.post("/createCollection/:projectTitle", createProject);

router.put("/updateCollection/:projectTitle", updateProject);

router.delete("/deleteCollection/:projectTitle", deleteProejct);

module.exports = router;
