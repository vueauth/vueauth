module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3bdf83198e630b4d6c0daf4d6af08c19'),
  },
});
