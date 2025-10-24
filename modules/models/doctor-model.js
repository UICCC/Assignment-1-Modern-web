const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/doctors.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all doctors
exports.getAllDoctors = () => readData();

// GET doctor by ID
exports.getDoctorById = (id) => {
  const doctors = readData();
  return doctors.find(d => String(d.DoctorID) === String(id));
};

// ADD new doctor
exports.addNewDoctor = (doctor) => {
  const doctors = readData();
  const maxID = doctors.length > 0 ? Math.max(...doctors.map(d => d.DoctorID || 0)) : 0;
  const newDoctor = { DoctorID: maxID + 1, ...doctor };
  doctors.push(newDoctor);
  writeData(doctors);
  return newDoctor;
};

// DELETE doctor
exports.deleteDoctor = (id) => {
  let doctors = readData();
  doctors = doctors.filter(d => String(d.DoctorID) !== String(id));
  writeData(doctors);
};

// UPDATE existing doctor
exports.updateExistingDoctor = (id, updatedData) => {
  const doctors = readData();
  const index = doctors.findIndex(d => String(d.DoctorID) === String(id));
  if (index === -1) return null;
  doctors[index] = { ...doctors[index], ...updatedData };
  writeData(doctors);
  return doctors[index];
};
