const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const salesRoutes = require("./routes/sales");
const expenseRoutes = require("./routes/expenses");
const customerRoutes = require("./routes/customers");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BizManager NG API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
