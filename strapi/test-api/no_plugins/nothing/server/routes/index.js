module.exports = {
  api: {
    type: 'content-api',
    routes: [
      {
        method: 'PUT',
        path: '/',
        handler: 'changePasswordController.change',
        config: {
          middlewares: ['plugin::change-passwordeep.validate-change-passwordeep-request'],
          policies: [],
        },
      },
    ]
  }
};
