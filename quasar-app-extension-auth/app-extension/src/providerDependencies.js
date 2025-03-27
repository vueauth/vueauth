export default {
  firebase: {
    dependencies: {
      firebase: '^9.0.0',
      '@vueauth/firebase': '^1.1.0-alpha.4',
      '@vueauth/core': '1.1.0-alpha.*'
    }
  },
  supabase: {
    dependencies: {
      '@supabase/supabase-js': '^1.28.5',
      '@vueauth/supabase': '^1.1.0-alpha.4',
      '@vueauth/core': '1.1.0-alpha.*'
    }
  },
  indexeddb: {
    dependencies: {
      '@vueauth/indexeddb': '^1.1.0-alpha.7',
      '@vueauth/core': '1.1.0-alpha.*'
    }
  },
  sanctum: {
    dependencies: {
      '@vueauth/sanctum': '^1.1.0-alpha.4',
      '@vueauth/core': '1.1.0-alpha.*'
    }
  },
  strapi: {
    dependencies: {
      '@vueauth/strapi': '^1.1.0-alpha.4',
      '@vueauth/core': '1.1.0-alpha.*'
    }
  }
}
