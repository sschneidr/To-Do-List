const mongoose = require("mongoose");

const getProjects = async (req, res) => {
  try {
    const items = await mongoose.connection.listCollections();
    items.sort();
    items.reverse();
    res.send(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    await mongoose.connection.db.createCollection(req.params.projectTitle);
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    await mongoose.connection.db
      .collection(req.params.projectTitle)
      .rename(req.body.name);
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProejct = async (req, res) => {
  try {
    await mongoose.connection.db.dropCollection(req.params.projectTitle);
    res.send([]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProejct,
};
