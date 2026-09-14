const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

const isValidId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

// GET all products
router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
});

// GET one product
router.get("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product = await Product.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
});

// CREATE a product
router.post("/", auth, async (req, res) => {
  try {
    const {
      name,
      price,
      quantity,
      category,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (
      price === undefined ||
      Number(price) < 0
    ) {
      return res.status(400).json({
        message: "A valid price is required",
      });
    }

    if (
      quantity === undefined ||
      Number(quantity) < 0
    ) {
      return res.status(400).json({
        message: "A valid quantity is required",
      });
    }

    const product = await Product.create({
      userId: req.userId,
      name: name.trim(),
      price: Number(price),
      quantity: Number(quantity),
      category: category?.trim() || "",
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// UPDATE a product
router.put("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const {
      name,
      price,
      quantity,
      category,
    } = req.body;

    const product =
      await Product.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId,
        },
        {
          name: name?.trim(),
          price: Number(price),
          quantity: Number(quantity),
          category:
            category?.trim() || "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// DELETE a product
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid product id",
      });
    }

    const product =
      await Product.findOneAndDelete({
        _id: req.params.id,
        userId: req.userId,
      });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
});

module.exports = router;