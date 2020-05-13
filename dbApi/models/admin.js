
const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = global.sequelize;
const User = sequelize.models.User;

class Admin extends User {};

Admin.init({
  // Model attributes are defined here
	unId: {
		type: DataTypes.STRING(16),
		allowNull: false,
		primaryKey: true
	},
	adminType: {
		type: DataTypes.INTEGER(2),
		defualtValue: 1
	}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Admin' // We need to choose the model name
});

const loadAdmin = async () => {
	await Admin.sync({force: true})
};

module.exports = {loadAdmin};
