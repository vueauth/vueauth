'use strict';

const sanitizeUser = require('../helpers/sanitize-user');

module.exports = {
  change: async ctx => {
    const { auth, user } = ctx.state;

    strapi.plugin('change-passwordeep')
      .service('change-passwordeep')
      .change(user.id, ctx.request.body.newPassword);

    // Return new jwt token
    ctx.send({
      jwt: strapi.service('plugin::users-permissions.jwt').issue({
        id: user.id,
      }),
      user: sanitizeUser(user, auth),
    });

  },
};
