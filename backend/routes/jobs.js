const express = require("express");
const router = express.Router();
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJob,
} = require("../controllers/jobController");

//HANDLES ROUTES
router.post("/", createJob);

router.get("/", getAllJobs);
router.get("/:id", getJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
