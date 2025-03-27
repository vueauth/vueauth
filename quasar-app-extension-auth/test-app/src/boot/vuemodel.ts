import { boot } from 'quasar/wrappers'
import { createVueModel, useModelDriver } from '@vuemodel/core'
import { createPiniaLocalStorage, piniaLocalVueModelDriver } from '@vuemodel/pinia-local-storage'

export default boot(({ app, store }) => {
  const piniaLocalStorage = createPiniaLocalStorage({
    frontStore: store,
  })

  const vueModel = createVueModel({
    default: 'local',
    drivers: {
      local: {
        driver: {
          ...piniaLocalVueModelDriver,
          /** @ts-expect-error beep */
          useModel: useModelDriver,
        },
        config: { pinia: store },
      },
    },
  })

  app.use(vueModel)
  app.use(piniaLocalStorage)
})
