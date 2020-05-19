
const sequelize = global.sequelize;
const User = sequelize.models.User;
const Admin = sequelize.models.Admin;
const {Op} = require("sequelize");

/**
 * Gets University ID from Facebook Id from the database
 */

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

const getUnIdFromPsId = async (_psId) => {
	const user = await getUserByPsId(_psId);
	if (user) {
		return user.unId;
	}
	return user;
};

const getClassAdmins = async (_unId) => {
	return await Admin.findAll({
		where: {
			[Op.and]: [
				{
					unId: {
						[Op.like]: `${_unId.substring(0, 8)}%`
					}
				},
				{
					regStatus: {
						[Op.eq] : 1
					}
				}
			]
		}
	});
};

// TODO (May 12, 2020): Update the get senior Admins Id 
const getSeniorAdmins = async (_unId) => {
	return await Admin.findAll({
		where: {
			unId: {
				[Op.like]: `190042119`
			}
		}
	});
}

module.exports = {getUserByUnId, getUserByPsId, getUnIdFromPsId, getClassAdmins, getSeniorAdmins};

