const { mongoose } = require("mongoose");
const Budget = require("../models/BudgetModel");

// GET All Budgets
const getBudgets = async (req, res) => {
  try {
    const allBudgets = await Budget.find({}).sort({ createdAt: -1 });
    res.status(200).json(allBudgets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a new budget
const createBudget = async (req, res) => {
  const { title, price } = req.body;
  try {
    const newBudget = await Budget.create({ title, price });
    res.status(200).json(newBudget);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single budget
const getBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such budgets" });
  }
  const singleBudget = await Budget.findById(id);
  if (!singleBudget) {
    return res.status(404).json({ error: "no such budget" });
  }
  res.status(200).json(singleBudget);
};

// UPDATE a budget
const updateBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such budget" });
  }

  const updatedBudget = await Budget.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    {
      new: true,
    }
  );
  if (!updatedBudget) {
    return res.status(404).json({ error: "no such budget" });
  }
  res.status(200).json(updatedBudget);
};

// DELETE a budget
const deleteBudget = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such budget" });
  }
  const deletedBudget = await Budget.findOneAndDelete({ _id: id });

  if (!deletedBudget) {
    return res.status(404).json({ error: "no such budget" });
  }

  res.status(200).json(deletedBudget);
};

module.exports = {
  createBudget,
  getBudgets,
  getBudget,
  updateBudget,
  deleteBudget,
};
