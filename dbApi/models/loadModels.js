
const {loadUser} = require("./user.js");

const loadModels = async () => {
	await loadUser();
}

module.exports = {loadModels};
