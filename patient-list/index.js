const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const patients = JSON.parse(
  fs.readFileSync(path.join(__dirname, "patients.json"), "utf-8")
);


app.get("/", (req, res) => {
  res.send("👨‍⚕️ Welcome to the Patient Records API");
});

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.get("/patients/:id", (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ message: "Patient not found" });
  }
});


app.get("/search", (req, res) => {
  const { disease } = req.query;
  if (!disease) {
    return res.status(400).json({ message: "Please provide a disease query" });
  }
  const results = patients.filter(p =>
    p.disease.toLowerCase().includes(disease.toLowerCase())
  );
  res.json(results);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
