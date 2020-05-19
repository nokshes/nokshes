
const {Op} = require("sequelize");
const sequelize = global.sequelize;
const User = sequelize.models.User;

/**
 * Gets University ID from Facebook Id from the database
 */

 // TODO Write the SQL query properly
const getUserByUnId = async (_unId) => {
	return await User.findOne({
		where: {
			unId: _unId,
		}
	});
};

const getUserByPsId = async (_psId) => {
	return await User.findOne({
		where: {
			psId: _psId
		}
	});
};

// TODO Change the code of following function to a proper SQL Query
const getUnIdFromPsId = async (_psId) => {
	const user = await getUserByPsId(_psId);
	if (user) {
		return user.unId;
	}
	return user;
};

const getClassAdmins = async (_unId) => {
	return await User.findAll({
		where: {
			[Op.and]: [
				{
					unId: {
						[Op.like]: `${_unId.substring(0, 7)}%`
					}
				},
				{
					regStatus: {
						[Op.eq] : 1
					}
				}, 
				{
					isAdmin: true
				}
			]
		}
	});
};

// TODO (May 12, 2020): Update the get senior Admins Id 
const getSeniorAdmins = async (_unId) => {
	return await User.findOne({
		where: {
			unId: {
				[Op.like]: `190042119`
			}
		}
	});
}

module.exports = {getUserByUnId, getUserByPsId, getUnIdFromPsId, getClassAdmins, getSeniorAdmins};
