const express = require("express");
const router = express.Router();
const doctorModel = require("../models/doctor-model");

// GET all doctors
router.get("/", (req, res) => {
  const doctors = doctorModel.getAllDoctors();
  res.json(doctors);
});

// GET doctor by ID
router.get("/:id", (req, res) => {
  const doctor = doctorModel.getDoctorById(req.params.id);
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(doctor);
});

// POST new doctor
router.post("/", (req, res) => {
  const newDoctor = doctorModel.addNewDoctor(req.body);
  res.status(201).json(newDoctor);
});

// PUT update doctor
router.put("/:id", (req, res) => {
  const updatedDoctor = doctorModel.updateExistingDoctor(req.params.id, req.body);
  if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
  res.json(updatedDoctor);
});

// DELETE doctor
router.delete("/:id", (req, res) => {
  doctorModel.deleteDoctor(req.params.id);
  res.status(204).send();
});

module.exports = router;
