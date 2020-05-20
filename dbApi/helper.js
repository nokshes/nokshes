const { Op } = require("sequelize");
const sequelize = global.sequelize;
const User = sequelize.models.User;

/**
 * Gets University ID from Facebook Id from the database
 */

const getUserByUnId = async (_unId) => {
  return await User.findOne({
    where: {
      [Op.and]: [
        {
          unId: _unId,
        },
        {
          regStatus: 1,
        },
      ],
    },
  });
};

const getUserByPsId = async (_psId) => {
  return await User.findOne({
    where: {
      psId: _psId,
    },
  });
};

const getUnIdFromPsId = async (_psId) => {
  return await User.findOne({
    attributes: ["unId"],
    where: {
      psId: _psId,
    },
  });
};

const getClassAdminPsIds = async (_unId) => {
  return await User.findAll({
    attributes: ["psId"],
    where: {
      [Op.and]: [
        {
          unId: {
            [Op.like]: `${_unId.substring(0, 7)}%`,
          },
        },
        {
          regStatus: {
            [Op.eq]: 1,
          },
        },
        {
          isAdmin: true,
        },
      ],
    },
  });
};

// TODO (May 12, 2020): Update the get senior Admins Id
const getSeniorAdminPsIds = async (_unId) => {
  return await User.findOne({
    attributes: ["psId"],
    where: {
      unId: {
        [Op.like]: `190042119`,
      },
    },
  });
};

module.exports = {
  getUserByUnId,
  getUserByPsId,
  getUnIdFromPsId,
  getClassAdminPsIds,
  getSeniorAdminPsIds,
};
