const express = require("express");
const {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
} = require("../controllers/BudgetController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// Require auth for all budgets routes.
router.use(requireAuth);

// GET All Budgets
router.get("/", getBudgets);

// POST a new budget
router.post("/", createBudget);

// GET a single budget
router.get("/:id", getBudget);

// UPDATE a budget
router.patch("/:id", updateBudget);

// DELETE a budget
router.delete("/:id", deleteBudget);

module.exports = router;
