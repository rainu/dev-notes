import i18n from '../locales'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale,
  setupCrypto: false,
  encrypted: false,
  date: {
    timeFormat: '24hr',
    firstDayOfWeek: 1
  },
  notes: {
    fixed: false,
    size: null,
    deleteHard: false
  },
  theme: {
    dark: true,
  },
  notification: {
    supported: false,
    granted: false,
  }
})

export const mutations = {
  setupCrypto(state, setup) {
    state.setupCrypto = setup
  },
  setEncrypted(state, encrypted) {
    state.encrypted = encrypted
  },
  setLang(state, lang) {
    if (state.locales.indexOf(lang) !== -1) {
      state.locale = lang

      this.$localStore.setLanguage(lang)
    }
  },
  setNotificationSupported(state, supported) {
    state.notification.supported = supported
  },
  setNotificationGranted(state, granted) {
    state.notification.granted = granted
  },
  setNoteSize(state, {fixed, size}) {
    state.notes.fixed = fixed
    state.notes.size = size

    this.$localStore.setNoteSize(fixed, size)
  },
  setThemeDarkMode(state, dark) {
    state.theme.dark = dark

    this.$localStore.setThemeDarkMode(dark)
  },
  setDateTimeFormat(state, format) {
    state.date.timeFormat = format
    this.$localStore.setDateTimeFormat(format)
  },
  setDateFirstDay(state, day) {
    state.date.firstDayOfWeek = day
    this.$localStore.setDateFirstDay(day)
  },
  setNoteDeleteHard(state, mode) {
    state.notes.deleteHard = mode
    this.$localStore.setNoteDeleteHard(mode)
  }
}

export const getters = {
  isNotificationEnabled(state){
    return state.notification.supported && state.notification.granted
  }
}

export const actions = {
  init(ctx) {
    return Promise.all([
      this.$localStore.isEncrypted()
        .then(isEncrypted => {
          if(isEncrypted !== null) {
            return ctx.commit('setEncrypted', isEncrypted)
          }
        }),
      this.$localStore.getLanguage()
        .then(lang => {
          if(lang){
            return ctx.dispatch('applyLanguage', lang)
          }
        }),
      this.$localStore.getThemeDarkMode()
        .then(dark => {
          if(dark !== null) {
            return ctx.dispatch('applyThemeDark', dark)
          } else {
            //if there is no settings (fresh install) - apply the default theme mode here
            return ctx.dispatch('applyThemeDark', true)
          }
        }),
      this.$localStore.getNoteSize()
        .then(noteSize => {
          if(noteSize) {
            return ctx.commit('setNoteSize', noteSize)
          }
        }),
      this.$localStore.getDateTimeFormat()
        .then(format => {
          if(format) {
            return ctx.commit('setDateTimeFormat', format)
          }
        }),
      this.$localStore.getDateFirstDay()
        .then(day => {
          if(day) {
            return ctx.commit('setDateFirstDay', day)
          }
        }),
      this.$localStore.getNoteDeleteHard()
        .then(mode => {
          if(mode) {
            return ctx.commit('setNoteDeleteHard', mode)
          }
        }),
    ])
  },
  applyLanguage(ctx, lang) {
    this.app.i18n.locale = lang
    ctx.commit('setLang', lang)
  },
  applyThemeDark(ctx, dark) {
    this.app.vuetify.framework.theme.isDark = dark
    ctx.commit('setThemeDarkMode', dark)
  },
  setupCrypto(ctx, secret){
    this.$localStore.setupEncryptionModule(secret)
    ctx.commit('setupCrypto', true)
  },
  enableEncryption(ctx, secret){
    return this.$localStore.enableEncryption(secret).then(() => {
      ctx.commit('setupCrypto', true)
      ctx.commit('setEncrypted', true)
    })
  },
  disableEncryption(ctx){
    return this.$localStore.disableEncryption().then(() => {
      ctx.commit('setupCrypto', false)
      ctx.commit('setEncrypted', false)
    })
  },
  checkSecret(ctx, secret){
    return this.$localStore.checkSecret(secret)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
