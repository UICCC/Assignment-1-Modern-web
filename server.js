require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./shared/middlewares/connect-db"); // DB middleware

const server = express();

// Import all routers
const patientRoutes = require("./modules/patients/routes/patient-routes");
const doctorRoutes = require("./modules/doctor/routes/doctor-routes");
const hospitalRoutes = require("./modules/hospital/routes/hospital-routes");
const insuranceRoutes = require("./modules/insurance/routes/insurance-routes");
const conditionRoutes = require("./modules/condition/routes/condition-routes");
const admissionRoutes = require("./modules/admission/routes/admission-routes");

const port = process.env.PORT || 3000;
const hostname = "localhost";

// Middleware to parse JSON and URL-encoded bodies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// MongoDB Connection Middleware (runs before routes)
server.use(connectDB);

// Mount routers at their respective endpoints
server.use("/patients", patientRoutes);
server.use("/doctors", doctorRoutes);
server.use("/hospitals", hospitalRoutes);
server.use("/insurances", insuranceRoutes);
server.use("/conditions", conditionRoutes);
server.use("/admissions", admissionRoutes);

// Root route
server.get("/", (req, res) => {
  res.send("✅ API is running! Try /patients, /doctors, /hospitals, /insurances, /conditions, /admissions");
});

// 404 handler for unmatched routes
server.use((req, res, next) => {
  res.status(404).send(`404! ${req.method} ${req.path} Not Found.`);
});

// Error handler
server.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server." });
});

// Start server: attempt an initial MongoDB connection so the app can listen.
async function startServer() {
  const DB_URL = process.env.DB_URL;

  if (DB_URL) {
    try {
      const DB_NAME = process.env.DB_NAME; // optional
      const connectOptions = {};
      if (DB_NAME) connectOptions.dbName = DB_NAME;

      await mongoose.connect(DB_URL, connectOptions);
      console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
      console.error("❌ MongoDB Connection Failed:", err.message);
      // If DB connection is critical, exit. Otherwise you can comment this out to run without DB.
      process.exit(1);
    }
  } else {
    console.warn("⚠️ DB_URL not set. Starting server without initial DB connection.");
  }

  server.listen(port, hostname, () => {
    console.log(`✅ Server running at http://${hostname}:${port}`);
  });
}

startServer();
