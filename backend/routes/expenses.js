const express = require("express");
const mongoose = require("mongoose");

const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

const router = express.Router();

const isValidId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

// GET all expenses
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({
      userId: req.userId,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
});

// GET one expense
router.get("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid expense id",
      });
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
});

// CREATE an expense
router.post("/", auth, async (req, res) => {
  try {
    const {
      description,
      amount,
      category,
      paymentMethod,
      date,
    } = req.body;

    if (!description?.trim()) {
      return res.status(400).json({
        message: "Expense description is required",
      });
    }

    if (
      amount === undefined ||
      Number(amount) <= 0
    ) {
      return res.status(400).json({
        message:
          "A valid expense amount is required",
      });
    }

    const expense = await Expense.create({
      userId: req.userId,
      description: description.trim(),
      amount: Number(amount),
      category: category?.trim() || "",
      paymentMethod:
        paymentMethod || "Cash",
      date: date
        ? new Date(date)
        : new Date(),
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create expense",
      error: error.message,
    });
  }
});

// UPDATE an expense
router.put("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid expense id",
      });
    }

    const {
      description,
      amount,
      category,
      paymentMethod,
      date,
    } = req.body;

    const expense =
      await Expense.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          description: description?.trim(),
          amount: Number(amount),
          category:
            category?.trim() || "",
          paymentMethod:
            paymentMethod || "Cash",
          date: date
            ? new Date(date)
            : undefined,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update expense",
      error: error.message,
    });
  }
});

// DELETE an expense
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid expense id",
      });
    }

    const expense =
      await Expense.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message:
        "Expense deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete expense",
      error: error.message,
    });
  }
});

module.exports = router;