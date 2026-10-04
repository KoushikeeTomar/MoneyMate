const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");

const {
  getSummary,
  categoryAnalytics,
  monthlyAnalytics,
} = require("../controllers/dashboardController");

router.get("/summary", protect, getSummary);
router.get("/categories", protect, categoryAnalytics);
router.get("/monthly", protect, monthlyAnalytics);

module.exports = router;