
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.sequelize;

class User extends Model {
	getFullName() {
		return [this.firstName, this.lastName].join(" ");
	}
};

User.init({
  // Model attributes are defined here
	fbId: {
		type: DataTypes.STRING(64)
	},
	psId: {
		type: DataTypes.STRING(64),
		allowNull: false
	},
	unId: {
		type: DataTypes.STRING(16),
		defaultValue: "000000000",
		allowNull: false,
		primaryKey: true
	},
  firstName: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(32),
    // allowNull defaults to true
  },
	gender: {
		type: DataTypes.STRING(16),
    allowNull: false
	},
	regStatus: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
}, {
  // Other model options go here
	sequelize, // We need to pass the connection instance
  modelName: "User" // We need to choose the model name
});


// Syncing with the database with current User model
const loadUser = async () => {
  await User.sync({force: true});
};

module.exports = {loadUser};
