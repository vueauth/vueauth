module.exports = function getPluginService (name) {
  return strapi.plugin('users-permissions').service(name);
};
