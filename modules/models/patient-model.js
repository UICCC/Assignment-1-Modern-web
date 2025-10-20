const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/patients.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all patients
exports.getAllPatients = () => readData();

// GET patient by ID
exports.getPatientById = (id) => {
  const patients = readData();
  return patients.find(p => String(p.PatientID) === String(id));
};

// ADD new patient
exports.addNewPatient = (patient) => {
  const patients = readData();

  const maxID = patients.length > 0 ? Math.max(...patients.map(p => p.PatientID || 0)) : 0;
  const newPatient = { PatientID: maxID + 1, ...patient };

  patients.push(newPatient);
  writeData(patients);

  return newPatient;
};

// DELETE patient
exports.deletePatient = (id) => {
  let patients = readData();
  patients = patients.filter(p => String(p.PatientID) !== String(id));
  writeData(patients);
};

// UPDATE existing patient
exports.updateExistingPatient = (id, updatedData) => {
  const patients = readData();
  const index = patients.findIndex(p => String(p.PatientID) === String(id));

  if (index === -1) return null;

  // Update only provided fields
  patients[index] = { ...patients[index], ...updatedData };
  writeData(patients);

  return patients[index];
};
