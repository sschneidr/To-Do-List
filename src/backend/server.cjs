const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { HttpStatusCode } = require("axios");
const app = express();
require("dotenv").config({ path: "../../.env" });
app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    app.listen(process.env.VITE_PORT, () => {
      console.log(`Listening on port ${process.env.VITE_PORT}!`);
    });
  })
  .catch((error) => console.log(error));

const taskRoutes = require("./routes/taskRoutes.cjs");
const projectRoutes = require("./routes/projectRoutes.cjs");
const pageRoutes = require("./routes/pageRoutes.cjs");

app.use("/", taskRoutes);
app.use("/", projectRoutes);
app.use("/", pageRoutes);
