const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/admissions.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all admissions
exports.getAllAdmissions = () => readData();

// GET admission by ID
exports.getAdmissionById = (id) => {
  const admissions = readData();
  return admissions.find(a => String(a.AdmissionID) === String(id));
};

// ADD new admission
exports.addNewAdmission = (admission) => {
  const admissions = readData();
  const maxID = admissions.length > 0 ? Math.max(...admissions.map(a => a.AdmissionID || 0)) : 0;
  const newAdmission = { AdmissionID: maxID + 1, ...admission };

  admissions.push(newAdmission);
  writeData(admissions);

  return newAdmission;
};

// DELETE admission
exports.deleteAdmission = (id) => {
  let admissions = readData();
  admissions = admissions.filter(a => String(a.AdmissionID) !== String(id));
  writeData(admissions);
};

// UPDATE existing admission
exports.updateExistingAdmission = (id, updatedData) => {
  const admissions = readData();
  const index = admissions.findIndex(a => String(a.AdmissionID) === String(id));
  if (index === -1) return null;

  admissions[index] = { ...admissions[index], ...updatedData };
  writeData(admissions);

  return admissions[index];
};
