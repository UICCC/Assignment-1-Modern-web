const express = require("express");
const server = express();

// Import all routers
const patientRoutes = require("./modules/routes/patient-routes");
const doctorRoutes = require("./modules/routes/doctor-routes");
const hospitalRoutes = require("./modules/routes/hospital-routes");
const insuranceRoutes = require("./modules/routes/insurance-routes");
const conditionRoutes = require("./modules/routes/condition-routes");
const admissionRoutes = require("./modules/routes/admission-routes");

const port = 3000;
const hostname = "localhost";

// Middleware to parse JSON and URL-encoded bodies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

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

// Start server
server.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
});
