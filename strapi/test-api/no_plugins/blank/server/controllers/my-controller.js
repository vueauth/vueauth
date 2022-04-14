'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('blank')
      .service('myService')
      .getWelcomeMessage();
  },
};
