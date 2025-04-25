const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/jobs", jobRoutes);

// CONNECT TO DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
