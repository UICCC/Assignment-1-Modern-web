const express = require("express");
const router = express.Router();
const patientModel = require("../models/patient-model");
const { validatePatient } = require("../middlewares/validationMiddleware");

// GET all patients
router.get("/", (req, res) => {
  res.json(patientModel.getAllPatients());
});

// GET patient by ID
router.get("/:id", (req, res) => {
  const patient = patientModel.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });
  res.json(patient);
});

// POST new patient
router.post("/", validatePatient, (req, res) => {
  const newPatient = patientModel.addNewPatient(req.body);
  res.status(201).json(newPatient);
});

// PUT update patient
router.put("/:id", validatePatient, (req, res) => {
  const updatedPatient = patientModel.updateExistingPatient(req.params.id, req.body);
  if (!updatedPatient) return res.status(404).json({ error: "Patient not found" });
  res.json(updatedPatient);
});

// DELETE patient
router.delete("/:id", (req, res) => {
  const patient = patientModel.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ error: "Patient not found" });

  patientModel.deletePatient(req.params.id);
  res.json({ message: "Patient deleted successfully" });
});

module.exports = router;
