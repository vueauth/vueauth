import { App } from 'vue'

function (app: App) {
  app.use(SupabasePlugin, { credentials: supabaseCredentials })
}
