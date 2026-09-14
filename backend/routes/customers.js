const express = require("express");
const mongoose = require("mongoose");

const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

const router = express.Router();

const isValidId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

// GET all customers
router.get("/", auth, async (req, res) => {
  try {
    const customers = await Customer.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
});

// GET one customer
router.get("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
});

// CREATE customer
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      address,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Customer name is required",
      });
    }

    if (!phone?.trim()) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    const customer = await Customer.create({
      userId: req.userId,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || "",
      address: address?.trim() || "",
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

// UPDATE customer
router.put("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    const {
      name,
      phone,
      email,
      address,
    } = req.body;

    const customer =
      await Customer.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          name: name?.trim(),
          phone: phone?.trim(),
          email: email?.trim() || "",
          address: address?.trim() || "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

// DELETE customer
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid customer id",
      });
    }

    const customer =
      await Customer.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete customer",
      error: error.message,
    });
  }
});

module.exports = router;