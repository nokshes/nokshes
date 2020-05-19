
const {getPublicProfile} = require("../../graphApi/get.js");
const {sendReqPostCard} = require("../../graphApi/post.js");
const {
	getUserByPsId, getUserByUnId,
	getClassAdmins, getSeniorAdmins
} = require("../../dbApi/helper.js");

const sequelize = global.sequelize;
const User = sequelize.models.User;

const register = async (_psId, _unId, _isAdmin) => {
	// TODO (May 09, 2020): Validate the correctness of universityId 

	let message;
	const registeredUser = await getUserByUnId(_unId);
	if (registeredUser) {
		if (registeredUser.psId == _psId) {
			message = "You're already registered.";
		} else {
			message = `There is already a registered user with University ID: ${_unId}`;
		}
		return message;
	}

	const user = await getUserByPsId(_psId);
	if (user && user.regStatus == 2) {
		message = "Your previous registration application is already PENDING.";
		return message;
	}

	// find the Admin who is capable of approving his ID, i.e CR or more higher authority
	let admins = await getClassAdmins(_unId);
	if (_isAdmin && admins.length > 1) {
		message = "There are already sufficient number of registered admins for your class."
			+ "Your registration will be processed as a regular student.";
	} else if (!_isAdmin && admins.length >= 1) {
		message = "Your registration will be processed as a regular student.";
	} else if (!_isAdmin && admins.length < 1) {
		message = "Your class doesn't have enough registered admins to review your application.";
		return message;
	} else {
		admins = await getSeniorAdmins(_unId);
		message = "Your registration will be processed as an administrator.";
	}

	// TODO: remove the following line of code and use the 'user' variable fetched from the database
	const profile = await getPublicProfile(_psId);
	profile.unId = _unId;
	await User.update({
		unId: _unId,
		isAdmin: _isAdmin,
		regStatus: 2
	}, {
		where: {
			psId: _psId
		}
	});

	await sendReqPostCard(profile, admins[Math.floor(Math.random() * admins.length)].psId);
	message += "Thank you for being patient. Your registration has been processed.";

	return message;

};

module.exports = {register};

