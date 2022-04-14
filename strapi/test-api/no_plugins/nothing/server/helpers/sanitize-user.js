const utils = require('@strapi/utils');
const { sanitize } = utils;

module.exports = function sanitizeUser(user, auth) {
  const userSchema = strapi.getModel('plugin::users-permissions.user');

  return sanitize.contentAPI.output(user, userSchema, { auth });
};
