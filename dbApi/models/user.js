
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
		type: DataTypes.STRING(64),
	},
	psId: {
		type: DataTypes.STRING(64),
		allowNull: false,
	},
	unId: {
		type: DataTypes.STRING(16),
		allowNull: false
		defaultValue: "000000000",
		primaryKey: true,
	},
  firstName: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(32),
    // allowNull defaults to true
  },
	gender: {
		type: DataTypes.STRING(16),
    allowNull: false,
	}
	regStatu: {
		type: DataType.INTEGER(2);
		defaultValue: 0,
	},
	isAdmin: {
		type: DataType.BOOLEAN,
		defaultValue: false,
	}
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});


// Syncing with the database with current User model
export const loadUser: async () => {
  await User.sync({alter: true});
};
