const express = require("express");
const server = express();

const patientRoutes = require("./modules/routes/patient-routes");

const port = 3000;
const hostname = "localhost";

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Mount patient routes at /patients
server.use("/patients", patientRoutes);

// Root route
server.get("/", (req, res) => {
  res.send("✅ API is running! Try /patients or /patients/1");
});

// 404 handler
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
