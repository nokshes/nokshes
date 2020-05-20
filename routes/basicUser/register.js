const { getPublicProfile } = require("../../graphApi/get.js");
const { sendReqPostCard } = require("../../graphApi/post.js");
const {
  getUserByPsId,
  getUserByUnId,
  getClassAdminPsIds,
  getSeniorAdminPsIds,
} = require("../../dbApi/helper.js");

const { updateObject } = require("../../util/langHelper.js");

const sequelize = global.sequelize;
const User = sequelize.models.User;

const register = async (_psId, _unId, _isAdmin) => {
  // TODO (May 09, 2020): Validate the correctness of universityId
  let message;
  try {
    const user = await getUserByPsId(_psId);
    if (user.regStatus == "1") {
      message = "You're already registered.";
      return message;
    } else if (user.regStatus == "2") {
      message = "Your previous registration application is already PENDING.";
      return message;
    }

    const registeredUser = await getUserByUnId(_unId);
    if (registeredUser) {
      message = `There is already a registered user with University ID: ${_unId}`;
      return message;
    }

    // find the Admin who is capable of approving his ID, i.e CR or more higher authority
    let admins = await getClassAdminPsIds(_unId);
    if (_isAdmin && admins.length > 1) {
      message =
        "There are already sufficient number of registered admins for your class." +
        "Your registration will be processed as a regular student.";
    } else if (!_isAdmin && admins.length >= 1) {
      message = "Your registration will be processed as a regular student.";
    } else if (!_isAdmin && admins.length < 1) {
      message =
        "Your class doesn't have enough registered admins to review your application.";
      return message;
    } else {
      admins = await getSeniorAdminPsIds(_unId);
      message = "Your registration will be processed as an administrator.";
    }

    const profile = await getPublicProfile(_psId);
    profile.unId = _unId;

    // Update the database according to the profile
    updateObject(user, {
      firstName: profile.first_name,
      lastName: profile.last_name,
      unId: _unId,
      isAdmin: _isAdmin,
      regStatus: 2,
    });
    await user.save();

    await sendReqPostCard(
      profile,
      admins[Math.floor(Math.random() * admins.length)].psId
    );
    message +=
      "Thank you for being patient. Your registration has been processed.";
  } catch (err) {
    message = "Something went wrong during processing your request.";
    console.log(err);
  }
  return message;
};

module.exports = { register };
