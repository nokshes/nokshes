const {Sequelize, DataTypes, Model} = require("sequelize");
const {loadUser} = require("./models/user.js");
const {loadAdmin} = require("./models/admin.js");

/**
 * Create a connection with the database if possible
 */
export const connect: () => {
	try {
		global.sequelize = new Sequelize("nokshesdb", "nokshesadmin", "iut@1234", {
			host: "noksheserver.database.windows.net",
			dialect: "mssql",
			dialectOptions: {
				options: {
					encrypt: true,
					requestTimeout: 60000
				}
			},
			pool: {
				// The following configurations are subject to change depending on user usage
				max: 5,			// max number of connections in the pool
				min: 1,			// min number of connections in the pool
				idle: 1800000,	// a connection will be closed after 30 mins of idleness
				acquire: 10000 // that pool will try to re-establish connection in 10 sec before throwing error

			}
		});
		console.log("Successfully established connection to the database");
	} catch (error) {
		console.log("Error establishing connection to database", error);
	}
};

export const loadModels: async () => {
	await loadUser();
	await loadAdmin();
}

export const testConnection: () => {
	const sequelize = global.sequelize;
	try {
		await sequelize.authenticate();
		console.log("Database is Connected");
		return true;
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		return false;
	}
};

