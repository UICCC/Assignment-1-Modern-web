const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/insurance.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all insurance providers
exports.getAllInsurance = () => readData();

// GET insurance provider by ID
exports.getInsuranceById = (id) => {
  const providers = readData();
  return providers.find(p => String(p.InsuranceProviderID) === String(id));
};

// ADD new insurance provider
exports.addNewInsurance = (provider) => {
  const providers = readData();
  const maxID = providers.length > 0 ? Math.max(...providers.map(p => p.InsuranceProviderID || 0)) : 0;
  const newProvider = { InsuranceProviderID: maxID + 1, ...provider };
  providers.push(newProvider);
  writeData(providers);
  return newProvider;
};

// DELETE insurance provider
exports.deleteInsurance = (id) => {
  let providers = readData();
  providers = providers.filter(p => String(p.InsuranceProviderID) !== String(id));
  writeData(providers);
};

// UPDATE existing insurance provider
exports.updateExistingInsurance = (id, updatedData) => {
  const providers = readData();
  const index = providers.findIndex(p => String(p.InsuranceProviderID) === String(id));
  if (index === -1) return null;
  providers[index] = { ...providers[index], ...updatedData };
  writeData(providers);
  return providers[index];
};
