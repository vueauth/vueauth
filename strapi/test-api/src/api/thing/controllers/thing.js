'use strict';

/**
 *  thing controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::thing.thing');
