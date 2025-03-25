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
    }
  ]
}
