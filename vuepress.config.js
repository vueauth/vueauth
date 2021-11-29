module.exports = {
  title: 'Firebase Composables',
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {

  },
  themeConfig: {
    navbar: [
      {
        text: 'GitHub',
        link: 'https://github.com/ldiebold/sanctum-composables'
      }
    ],
    sidebar:
    [
      '/',
      '/getting-started',
      '/email-password-registration',
      '/email-password-sign-in',
      '/sign-out',
      '/social-auth-providers',
      '/auth-state',
      '/guarding-routes',
      '/firestore'
    ]
  },
  markdown: {
    code: {
      lineNumbers: false
    }
  }

}
