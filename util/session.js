
/**
 * This module will handle session parameter settings.
 */

const {getUnIdFromPsId} = require("dbApi/helper.js");
const {getPublicProfile} = require("graphApi/get.js")

const sequelize = global.sequelize;
const User = sequelize.models.User;

/**
 * Setting unId as session entity if it does not exist
 */
export const sessionHandler = async (req, res) => {
	let _unid;

	_unid = global.sessions[req.body.sessionId];
	if (_unid !== undefined) {
		return;
	} else {
		console.log("Session Id not found!");
	}

	const _psId = req.body.psId;
	// Sent a request to the database to fetch the unId from fbId
	_unId = await getUnIdFromPsId(_psId);
	if (!_unId) {
		// it appears to be a new user
		// register him as guest user
		// but first get his name from graph api
		const profile = await getPublicProfile(_psId);
		await User.create({
			psId: _psId,
			unId: _unId,
			firstName: profile.first_name,
			last_name: profile.last_name,
		});
		_unId = "000000000";
	}
	
	// Push the University ID into the request body
	req.body.unId = _unId;
	// Add the current session to the global session list with the unId mapped
	globals.sessions[sessionId] = {unId: _unId, createdOn: req.body.timestamp};

};

export const autoSessionIdsCleaner = () => {
	console.log("Cleaning Up Expired Sessions");
	let activeSessionIds = {};
	const now = Date.now();
	for (const [sessionId, value] of Object.entries(global.sessions)) {
		if (value.createdOn + 1200000 > now) {
			activeSessionIds.sessionId = value;
		}
	}
	global.sessions = activeSessionIds;
};

