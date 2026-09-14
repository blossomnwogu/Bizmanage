const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

function createToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

// SIGN UP
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      business,
      email,
      password,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    if (!business?.trim()) {
      return res.status(400).json({
        message: "Business name is required",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "An account with this email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      business: business.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = createToken(
      user._id.toString()
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        business: user.business,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Failed to create account",
      error: error.message,
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user =
      await User.findOne({
        email: normalizedEmail,
      });

    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return res.status(401).json({
        message:
          "Invalid email or password",
      });
    }

    const token = createToken(
      user._id.toString()
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        business: user.business,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});

// CURRENT USER
router.get("/me", auth, async (req, res) => {
  try {
    const user =
      await User.findById(
        req.userId
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      business: user.business,
      email: user.email,
    });
  } catch (error) {
    console.error(
      "Load current user error:",
      error
    );

    res.status(500).json({
      message: "Failed to load account",
      error: error.message,
    });
  }
});

// UPDATE CURRENT USER
router.put("/me", auth, async (req, res) => {
  try {
    const {
      name,
      business,
      email,
    } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Full name is required",
      });
    }

    if (!business?.trim()) {
      return res.status(400).json({
        message: "Business name is required",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        message: "Email address is required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
        _id: {
          $ne: req.userId,
        },
      });

    if (existingUser) {
      return res.status(409).json({
        message:
          "Another account is already using this email",
      });
    }

    const user =
      await User.findByIdAndUpdate(
        req.userId,
        {
          name: name.trim(),
          business: business.trim(),
          email: normalizedEmail,
        },
        {
          new: true,
          runValidators: true,
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      id: user._id,
      name: user.name,
      business: user.business,
      email: user.email,
    });
  } catch (error) {
    console.error(
      "Update current user error:",
      error
    );

    res.status(500).json({
      message: "Failed to update account",
      error: error.message,
    });
  }
});

// EXPORT ROUTER
module.exports = router;