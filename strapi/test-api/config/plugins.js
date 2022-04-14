module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendmail',
      providerOptions: {
        devHost: 'maildev',
        devPort: 1025,
        smtpPort: 25,
        defaultFrom: 'luke@ldiebold.com',
        defaultReplyTo: 'luke@ldiebold.com',
      },
    },
  }
});
