import i18n from 'i18next'
import Fa from './locales/fa'

i18n.init({
  fallbackLng: 'fa',
  lng: 'fa',
  whitelist: ['fa'],
  nonExplicitWhitelist: true,
  load: 'languageOnly',
  resources: {
    en: {
      translation: Fa,
      direction: 'rtl',
    },
  },
  react: {
    wait: false, // set to true if you like to wait for loaded in every translated hoc
    nsMode: 'default', // set it to fallback to let passed namespaces to translated hoc act as fallback
  },
  interpolation: {
    escapeValue: false, // not needed for react
  },
  debug: true,
})

export default i18n
