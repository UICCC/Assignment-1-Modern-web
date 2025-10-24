const express = require("express");
const router = express.Router();
const insuranceModel = require("../models/insurance-model");

// GET all insurance providers
router.get("/", (req, res) => {
  try {
    const providers = insuranceModel.getAllInsurance();
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch insurance providers" });
  }
});

// GET insurance provider by ID
router.get("/:id", (req, res) => {
  try {
    const provider = insuranceModel.getInsuranceById(req.params.id);
    if (!provider) return res.status(404).json({ error: "Provider not found" });
    res.json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch insurance provider" });
  }
});

// POST new provider
router.post("/", (req, res) => {
  try {
    const newProvider = insuranceModel.addNewInsurance(req.body);
    res.status(201).json(newProvider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add provider" });
  }
});

// PUT update provider
router.put("/:id", (req, res) => {
  try {
    const updated = insuranceModel.updateExistingInsurance(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Provider not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update provider" });
  }
});

// DELETE provider
router.delete("/:id", (req, res) => {
  try {
    insuranceModel.deleteInsurance(req.params.id);
    res.json({ message: "Provider deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete provider" });
  }
});

module.exports = router;
