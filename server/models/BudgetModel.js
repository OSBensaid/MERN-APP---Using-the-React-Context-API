const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    budgetType: {
      type: String,
      required: true,
    },
    budgetCategory: {
      type: String,
      required: true,
    },
    budgetSubCategory: {
      type: String,
      required: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    budgetNote: {
      type: String,
      required: false,
    },
    budgetDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", Schema);
