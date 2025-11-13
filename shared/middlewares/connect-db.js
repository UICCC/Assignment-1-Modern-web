const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(req, res, next) {
  const DB_URL = process.env.DB_URL;

  if (!DB_URL) {
    console.error("❌ DB_URL not found in environment variables");
    return res.status(500).json({ error: "Database configuration missing" });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      return next(); // Already connected
    }

    await mongoose.connect(DB_URL, {
      dbName: "HospitalManagementDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
    next();
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    res.status(500).json({ error: "Database connection failed" });
  }
}

module.exports = connectDB;
