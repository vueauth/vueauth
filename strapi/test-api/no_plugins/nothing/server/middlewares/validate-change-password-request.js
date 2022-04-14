'use strict';

const formatError = require('../utils/formatError');
const getPluginService = require('../utils/getPluginService');

function InvalidException (id, message) {
  this.message = message;
  this.id = id;
  this.formattedForResponse = formatError({ id, message });
  this.name = 'InvalidException';
}

function validatePassword (password) {
  // The password is required.
  if (!password) {
    throw new InvalidException(
      'Auth.form.error.password.provide',
      'The "password" field is required.',
    );
  }
}

function validateNewPassword (newPassword) {
  // The new password is required.
  if (!newPassword) {
    throw new InvalidException(
      'Auth.form.error.password.provide',
      'The "new password" field is required.',
    );
  }
}

function validatePasswordConfirmation (passwordConfirmation) {
  // The new password confirmation is required.
  if (!passwordConfirmation) {
    throw new InvalidException(
      'Auth.form.error.password.provide',
      'The "password confirmation" field is required.',
    );
  }
}

function validatePasswordsMatch (newPassword, confirmPassword) {
  if (newPassword !== confirmPassword) {
    throw new InvalidException(
      'Auth.form.error.password.matching',
      'New Passwords do not match.',
    );
  }
}

async function findUserOrFail (ctx) {
  const query = { provider: 'local' };

  /**
   * TODO: Allow changing of identifier in config
   */
  query.id = ctx.state.user.id;

  const user = await strapi.query('plugin::users-permissions.user')
    .findOne({ where: query });

  if(user) {
    return user;
  } else {
    throw new InvalidException(
      'Auth.error.user.missing',
      'Unable to identify the user.',
    );
  }
}

async function validateOriginalPassword (originalPassword, user) {
  const validPassword = await getPluginService('user').validatePassword(
    originalPassword,
    user.password
  );

  if (!validPassword) {
    throw new InvalidException(
      'Auth.form.error.invalid',
      'Identifier or password invalid.',
    );
  }
}

module.exports = (config) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const params = ctx.request.body;

    try {
      const user = await findUserOrFail(ctx, config.identifier);
      await validateOriginalPassword(params.password, user);
      validatePassword(params.password);
      validateNewPassword(params.newPassword);
      validatePasswordConfirmation(params.confirmPassword);
      validatePasswordsMatch(params.newPassword, params.confirmPassword);
    } catch (error) {
      return ctx.badRequest(null, error.formattedForResponse);
    }

    await next();
  };
};
