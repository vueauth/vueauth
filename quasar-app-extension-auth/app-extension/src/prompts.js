export default () => {
  return [
    {
      name: 'authProvider',
      type: 'list',
      message: 'Select an auth provider',
      choices: [
        {
          name: 'IndexedDB',
          value: {
            identifier: 'indexeddb',
            packageName: '@vueauth/indexeddb'
          }
        },
        {
          name: 'Laravel Sanctum',
          value: {
            identifier: 'sanctum',
            packageName: '@vueauth/sanctum'
          }
        },
        {
          name: 'Firebase',
          value: {
            identifier: 'firebase',
            packageName: '@vueauth/firebase'
          }
        },
        {
          name: 'Supabase',
          value: {
            identifier: 'supabase',
            packageName: '@vueauth/supabase'
          }
        },
        {
          name: 'Strapi',
          value: {
            identifier: 'strapi',
            packageName: '@vueauth/strapi'
          }
        }
      ]
    },
    {
      message: 'Automatic Setup',
      type: 'checkbox',
      name: 'setup',
      choices: [
        {
          name: 'register boot file (quasar.conf)',
          description: 'Injects the "vueauth" boot file into quasar.conf > boot',
          value: 'registerBootFile',
          checked: true,
        },
        {
          name: 'add authenticateRoutes() to App.vue',
          description: 'This will allow VueAuth to handle authenticated/unauthenticated redirects',
          value: 'injectAuthenticateRoutes',
          checked: true,
        },
        {
          name: 'add auth routes',
          description: 'Point to authRoutes in your routes file',
          value: 'injectAuthRoutes',
          checked: true,
        },
      ],
    },
  ]
}
