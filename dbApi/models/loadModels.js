
const {loadUser} = require("./user.js");
const {loadAdmin} = require("./admin.js");

const loadModels = async () => {
	await loadUser();
	await loadAdmin();
}

module.exports = {loadModels};
