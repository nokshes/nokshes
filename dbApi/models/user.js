const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = global.sequelize;

class User extends Model {
  getFullName() {
    return [this.firstName, this.lastName].join(" ");
  }
}

User.init(
  {
    // Model attributes are defined here
    fbId: {
      type: DataTypes.STRING(64),
    },
    psId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    unId: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(32),
    },
    lastName: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    regStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
  }
);

// Syncing with the database with current User model
const loadUser = async () => {
  try {
    await User.sync({ alter: true });
  } catch (err) {
    console.log("Error Syncing with USER Table", err);
  }
};

module.exports = { loadUser };
