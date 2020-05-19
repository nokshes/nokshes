
const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize = global.sequelize;

class Admin extends Model {
	getFullName() {
		return [this.firstName, this.lastName].join(" ");
	}
};

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
	await Admin.sync({alter: true})
};

module.exports = {loadAdmin};
