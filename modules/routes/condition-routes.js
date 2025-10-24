const express = require("express");
const router = express.Router();
const conditionModel = require("../models/condition-model");

// GET all conditions
router.get("/", (req, res) => {
  try {
    const conditions = conditionModel.getAllConditions();
    res.json(conditions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch conditions" });
  }
});

// GET condition by ID
router.get("/:id", (req, res) => {
  try {
    const condition = conditionModel.getConditionById(req.params.id);
    if (!condition) return res.status(404).json({ error: "Condition not found" });
    res.json(condition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch condition" });
  }
});

// POST new condition
router.post("/", (req, res) => {
  try {
    const newCondition = conditionModel.addNewCondition(req.body);
    res.status(201).json(newCondition);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add condition" });
  }
});

// PUT update condition
router.put("/:id", (req, res) => {
  try {
    const updated = conditionModel.updateExistingCondition(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Condition not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update condition" });
  }
});

// DELETE condition
router.delete("/:id", (req, res) => {
  try {
    conditionModel.deleteCondition(req.params.id);
    res.json({ message: "Condition deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete condition" });
  }
});

module.exports = router;
