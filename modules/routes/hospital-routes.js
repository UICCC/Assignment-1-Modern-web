const express = require("express");
const router = express.Router();
const hospitalModel = require("../models/hospital-model");

// GET all hospitals
router.get("/", (req, res) => {
  try {
    const hospitals = hospitalModel.getAllHospitals();
    res.json(hospitals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
});

// GET hospital by ID
router.get("/:id", (req, res) => {
  try {
    const hospital = hospitalModel.getHospitalById(req.params.id);
    if (!hospital) return res.status(404).json({ error: "Hospital not found" });
    res.json(hospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch hospital" });
  }
});

// POST new hospital
router.post("/", (req, res) => {
  try {
    const newHospital = hospitalModel.addNewHospital(req.body);
    res.status(201).json(newHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add hospital" });
  }
});

// PUT update hospital
router.put("/:id", (req, res) => {
  try {
    const updated = hospitalModel.updateExistingHospital(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Hospital not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update hospital" });
  }
});

// DELETE hospital
router.delete("/:id", (req, res) => {
  try {
    hospitalModel.deleteHospital(req.params.id);
    res.json({ message: "Hospital deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete hospital" });
  }
});

module.exports = router;
