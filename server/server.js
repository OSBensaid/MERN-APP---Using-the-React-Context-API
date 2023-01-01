require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const budgetRoutes = require("./routes/budgetRoutes");

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/budgets", budgetRoutes);

// Connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
