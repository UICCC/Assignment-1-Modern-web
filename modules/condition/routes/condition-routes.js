const express = require("express");
const { validationResult } = require("express-validator");
const router = express.Router();
const conditionModel = require("../models/condition-model");
const createConditionRules = require("../middlewares/create-condition-rules");
const updateConditionRules = require("../middlewares/update-condition-rules");

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all conditions
router.get("/", async (req, res) => {
  const conditions = await conditionModel.getAllConditions();
  res.json(conditions);
});

// GET condition by ID
router.get("/:id", async (req, res) => {
  const condition = await conditionModel.getConditionById(req.params.id);
  if (!condition) return res.status(404).json({ message: "Condition not found" });
  res.json(condition);
});

// POST new condition
router.post("/", createConditionRules, validate, async (req, res) => {
  const newCondition = await conditionModel.addNewCondition(req.body);
  res.status(201).json(newCondition);
});

// PUT update condition
router.put("/:id", updateConditionRules, validate, async (req, res) => {
  const updated = await conditionModel.updateExistingCondition(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Condition not found" });
  res.json(updated);
});

// DELETE condition
router.delete("/:id", async (req, res) => {
  await conditionModel.deleteCondition(req.params.id);
  res.status(204).send();
});

module.exports = router;
