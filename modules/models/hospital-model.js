const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/hospitals.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all hospitals
exports.getAllHospitals = () => readData();

// GET hospital by ID
exports.getHospitalById = (id) => {
  const hospitals = readData();
  return hospitals.find(h => String(h.HospitalID) === String(id));
};

// ADD new hospital
exports.addNewHospital = (hospital) => {
  const hospitals = readData();
  const maxID = hospitals.length > 0 ? Math.max(...hospitals.map(h => h.HospitalID || 0)) : 0;
  const newHospital = { HospitalID: maxID + 1, ...hospital };
  hospitals.push(newHospital);
  writeData(hospitals);
  return newHospital;
};

// DELETE hospital
exports.deleteHospital = (id) => {
  let hospitals = readData();
  hospitals = hospitals.filter(h => String(h.HospitalID) !== String(id));
  writeData(hospitals);
};

// UPDATE existing hospital
exports.updateExistingHospital = (id, updatedData) => {
  const hospitals = readData();
  const index = hospitals.findIndex(h => String(h.HospitalID) === String(id));
  if (index === -1) return null;
  hospitals[index] = { ...hospitals[index], ...updatedData };
  writeData(hospitals);
  return hospitals[index];
};
