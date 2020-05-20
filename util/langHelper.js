const updateObject = (obj, newProps) => {
  for (let [key, value] of Object.entries(newProps)) {
    obj[key] = value;
  }
};

module.exports = { updateObject };
