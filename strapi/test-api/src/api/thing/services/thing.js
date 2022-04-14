'use strict';

/**
 * thing service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::thing.thing');
