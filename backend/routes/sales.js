const express = require("express");
const mongoose = require("mongoose");

const Sale = require("../models/Sale");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

const isValidId = (id) =>
  mongoose.Types.ObjectId.isValid(id);

/* =========================
   GET ALL SALES
========================= */

router.get("/", auth, async (req, res) => {
  try {
    const sales = await Sale.find({
      userId: req.userId,
    }).sort({
      date: -1,
      createdAt: -1,
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sales",
      error: error.message,
    });
  }
});

/* =========================
   GET ONE SALE
========================= */

router.get("/:id", auth, async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid sale id",
      });
    }

    const sale = await Sale.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!sale) {
      return res.status(404).json({
        message: "Sale not found",
      });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sale",
      error: error.message,
    });
  }
});

/* =========================
   CREATE SALE
========================= */

router.post("/", auth, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    let createdSale;

    await session.withTransaction(async () => {
      const {
        productId,
        quantity,
        paymentMethod,
        date,
      } = req.body;

      /* Validate product ID */
      if (!productId || !isValidId(productId)) {
        throw new Error("A valid product is required");
      }

      /* Validate quantity */
      const saleQuantity = Number(quantity);

      if (
        !Number.isInteger(saleQuantity) ||
        saleQuantity <= 0
      ) {
        throw new Error(
          "Quantity must be a positive whole number"
        );
      }

      /* Find user's product */
      const product = await Product.findOne({
        _id: productId,
        userId: req.userId,
      }).session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      /* Check stock */
      if (product.quantity < saleQuantity) {
        throw new Error(
          `Only ${product.quantity} item(s) available in stock`
        );
      }

      /* Calculate amount */
      const amount =
        product.price * saleQuantity;

      /* Create sale */
      const sale = new Sale({
        userId: req.userId,
        productId: product._id,
        productName: product.name,
        quantity: saleQuantity,
        price: product.price,
        amount,
        paymentMethod:
          paymentMethod || "Cash",
        date: date
          ? new Date(date)
          : new Date(),
      });

      await sale.save({ session });

      /* Reduce inventory */
      product.quantity -= saleQuantity;

      await product.save({ session });

      createdSale = sale;
    });

    res.status(201).json(createdSale);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to create sale",
    });
  } finally {
    await session.endSession();
  }
});

/* =========================
   UPDATE SALE
========================= */

router.put("/:id", auth, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    let updatedSale;

    await session.withTransaction(async () => {
      if (!isValidId(req.params.id)) {
        throw new Error("Invalid sale id");
      }

      /* Find existing sale */
      const existingSale = await Sale.findOne({
        _id: req.params.id,
        userId: req.userId,
      }).session(session);

      if (!existingSale) {
        throw new Error("Sale not found");
      }

      const {
        productId,
        quantity,
        paymentMethod,
        date,
      } = req.body;

      /* Validate product */
      if (!productId || !isValidId(productId)) {
        throw new Error(
          "A valid product is required"
        );
      }

      /* Validate quantity */
      const newQuantity = Number(quantity);

      if (
        !Number.isInteger(newQuantity) ||
        newQuantity <= 0
      ) {
        throw new Error(
          "Quantity must be a positive whole number"
        );
      }

      /* Restore old inventory */
      const oldProduct = await Product.findOne({
        _id: existingSale.productId,
        userId: req.userId,
      }).session(session);

      if (oldProduct) {
        oldProduct.quantity += existingSale.quantity;

        await oldProduct.save({ session });
      }

      /* Find new product */
      const newProduct = await Product.findOne({
        _id: productId,
        userId: req.userId,
      }).session(session);

      if (!newProduct) {
        throw new Error("Product not found");
      }

      /* Check new stock */
      if (newProduct.quantity < newQuantity) {
        throw new Error(
          `Only ${newProduct.quantity} item(s) available in stock`
        );
      }

      /* Calculate new amount */
      const amount =
        newProduct.price * newQuantity;

      /* Update sale */
      existingSale.productId =
        newProduct._id;

      existingSale.productName =
        newProduct.name;

      existingSale.quantity =
        newQuantity;

      existingSale.price =
        newProduct.price;

      existingSale.amount =
        amount;

      existingSale.paymentMethod =
        paymentMethod || "Cash";

      if (date) {
        existingSale.date =
          new Date(date);
      }

      await existingSale.save({
        session,
      });

      /* Reduce new inventory */
      newProduct.quantity -= newQuantity;

      await newProduct.save({
        session,
      });

      updatedSale = existingSale;
    });

    res.json(updatedSale);
  } catch (error) {
    res.status(400).json({
      message:
        error.message ||
        "Failed to update sale",
    });
  } finally {
    await session.endSession();
  }
});

/* =========================
   DELETE SALE
========================= */

router.delete("/:id", auth, async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      if (!isValidId(req.params.id)) {
        throw new Error("Invalid sale id");
      }

      /* Find sale */
      const sale = await Sale.findOne({
        _id: req.params.id,
        userId: req.userId,
      }).session(session);

      if (!sale) {
        throw new Error("Sale not found");
      }

      /* Restore inventory */
      const product = await Product.findOne({
        _id: sale.productId,
        userId: req.userId,
      }).session(session);

      if (product) {
        product.quantity += sale.quantity;

        await product.save({
          session,
        });
      }

      /* Delete sale */
      await Sale.deleteOne({
        _id: sale._id,
        userId: req.userId,
      }).session(session);
    });

    res.json({
      message: "Sale deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message:
        error.message ||
        "Failed to delete sale",
    });
  } finally {
    await session.endSession();
  }
});

module.exports = router;