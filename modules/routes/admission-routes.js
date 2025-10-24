const express = require("express");
const router = express.Router();
const admissionModel = require("../models/admission-model");

// GET all admissions
router.get("/", (req, res) => {
  const admissions = admissionModel.getAllAdmissions();
  res.json(admissions);
});

// GET admission by ID
router.get("/:id", (req, res) => {
  const admission = admissionModel.getAdmissionById(req.params.id);
  if (!admission) return res.status(404).json({ message: "Admission not found" });
  res.json(admission);
});

// POST new admission
router.post("/", (req, res) => {
  const newAdmission = admissionModel.addNewAdmission(req.body);
  res.status(201).json(newAdmission);
});

// PUT update admission
router.put("/:id", (req, res) => {
  const updatedAdmission = admissionModel.updateExistingAdmission(req.params.id, req.body);
  if (!updatedAdmission) return res.status(404).json({ message: "Admission not found" });
  res.json(updatedAdmission);
});

// DELETE admission
router.delete("/:id", (req, res) => {
  admissionModel.deleteAdmission(req.params.id);
  res.status(204).send();
});

module.exports = router;
