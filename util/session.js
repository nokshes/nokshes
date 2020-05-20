/**
 * This module will handle session parameter settings.
 */

const { getUnIdFromPsId } = require("../dbApi/helper.js");
const { getPublicProfile } = require("../graphApi/get.js");

const sequelize = global.sequelize;
const User = sequelize.models.User;

/**
 * Setting unId as session entity if it does not exist
 */
const sessionHandler = async (req, res, next) => {
  let _unId;

  const activeSession = global.sessions[req.body.sessionId];
  if (activeSession) {
    req.body.unId = activeSession.unId;
    return next();
  } else {
    console.log(`DEBUG: Session with ID:${req.body.sessionId} not found!`);
  }

  const _psId = req.body.psId;
  // Sent a request to the database to fetch the unId from psId
  try {
    ({ unId: _unId } = (await getUnIdFromPsId(_psId)) || {});
    if (!_unId) {
      // it appears to be a new user register him as guest user but first get his name from graph api
      const profile = await getPublicProfile(_psId);
      _unId = "000000000";
      await User.create({
        psId: _psId,
        unId: _unId,
        firstName: profile.first_name,
        lastName: profile.last_name,
        gender: profile.gender,
        regStatus: 0,
        isAdmin: false,
      });
    }

    // Push the University ID into the request body
    req.body.unId = _unId;
    // Add the current session to the global session list with the unId mapped
    global.sessions[req.body.sessionId] = {
      unId: _unId,
      createdOn: req.body.timestamp,
    };
    return next();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

const autoSessionIdsCleaner = () => {
  console.log("Cleaning Up Expired Sessions");
  try {
    let activeSessionIds = {};
    const now = Date.now();
    for (const [sessionId, value] of Object.entries(global.sessions)) {
      if (value.createdOn + 1200000 > now) {
        activeSessionIds.sessionId = value;
      }
    }
    console.log("Active Sessions List:\n", activeSessionIds);
    global.sessions = activeSessionIds;
  } catch (err) {
    console.log("Error Encountered During Cleaning Up Expired Session.\n", err);
  }
};

module.exports = { sessionHandler, autoSessionIdsCleaner };
