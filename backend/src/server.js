require("dotenv").config();

const express = require("express");
const cors = require("cors");
const skillRoutes =
require("./routes/skillRoutes");

const connectDB = require("./config/db");
const islandRoutes = require("./routes/islandRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes =
  require("./routes/aiRoutes");
  const developerProfileRoutes =
  require(
    "./routes/developerProfileRoutes"
  );


const taskRoutes =
require("./routes/taskRoutes");


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/island",
  islandRoutes
);
app.use("/api/ai", aiRoutes);

app.use("/api/goals", goalRoutes);
app.use(
  "/api/skills",
  skillRoutes
);
app.use(
  "/api/developer-profile",
  developerProfileRoutes
);

app.use("/api/auth", authRoutes);
app.use(
    "/api/tasks",
    taskRoutes
  );

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Strive Backend Running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});