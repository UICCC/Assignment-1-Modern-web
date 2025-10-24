const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/conditions.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET all conditions
exports.getAllConditions = () => readData();

// GET condition by ID
exports.getConditionById = (id) => {
  const conditions = readData();
  return conditions.find(c => String(c.ConditionID) === String(id));
};

// ADD new condition
exports.addNewCondition = (condition) => {
  const conditions = readData();
  const maxID = conditions.length > 0 ? Math.max(...conditions.map(c => c.ConditionID || 0)) : 0;
  const newCondition = { ConditionID: maxID + 1, ...condition };
  conditions.push(newCondition);
  writeData(conditions);
  return newCondition;
};

// DELETE condition
exports.deleteCondition = (id) => {
  let conditions = readData();
  conditions = conditions.filter(c => String(c.ConditionID) !== String(id));
  writeData(conditions);
};

// UPDATE existing condition
exports.updateExistingCondition = (id, updatedData) => {
  const conditions = readData();
  const index = conditions.findIndex(c => String(c.ConditionID) === String(id));
  if (index === -1) return null;
  conditions[index] = { ...conditions[index], ...updatedData };
  writeData(conditions);
  return conditions[index];
};
