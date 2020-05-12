
const sequelize = global.sequelize;
const User = sequelize.models.User;
const Admin = sequelize.models.Admin;

/**
 * Gets University ID from Facebook Id from the database
 */
export const getUnIdFromPsId: async (_psId) {
	return await User.findOne({
		attributes: ["unId"],
		where: {
			psId: _psId
		}
	});
};

export const getClassAdmins: async (_unId) => {
	return await Admin.findAll({
		where: {
			unId: {
				[Op.like]: `${_unId.substring(0, 8)}%`
			}
		}
	});
};

export const getSeniorAdmins: async (_unId) => {
	return await Admin.findAll({
		where: {
			unId: {
				[Op.like]: `190042119`
			}
		}
	});
}

export const getUserByUnId: async (_unId) => {
	return await User.findOne({
		where: {
			unId: _unId,
		}
	});
};

export const getUserByPsId: async (_psId) {
	return await User.findOne({
		where: {
			psId: _psId
		}
	});
};

