export default function (api) {
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.5.0 || ^2.0.0')
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.10.0 || ^4.0.0')
  }

  api.extendQuasarConf((conf, _api) => {
    conf.framework.plugins.push('Loading')

    if (api.hasWebpack) {
      // make sure app extension files & ui package gets transpiled
      const transpileTarget = (
        conf.build.webpackTranspileDependencies // q/app-webpack >= v4
        || conf.build.transpileDependencies // q/app-webpack v3
      )
      transpileTarget.push(/quasar-app-extension-auth[\\/]src/)
    }
  }, api)
}

export { authenticateRoutes } from './helpers/authenticateRoutes.js'