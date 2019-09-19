import i18n from '../locales'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale,
  notes: {
    fixed: false,
    size: null
  },
  theme: {
    dark: true,
  }
})

export const mutations = {
  setLang(state, lang) {
    if (state.locales.indexOf(lang) !== -1) {
      state.locale = lang

      this.$localStore.setLanguage(lang)
    }
  },
  setNoteSize(state, {fixed, size}) {
    state.notes.fixed = fixed
    state.notes.size = size

    this.$localStore.setNoteSize(fixed, size)
  },
  setThemeDarkMode(state, dark) {
    state.theme.dark = dark

    this.$localStore.setThemeDarkMode(dark)
  }
}

export const actions = {
  init(ctx) {
    return Promise.all([
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
        })
    ])
  },
  applyLanguage(ctx, lang) {
    this.app.i18n.locale = lang
    ctx.commit('setLang', lang)
  },
  applyThemeDark(ctx, dark) {
    this.app.vuetify.framework.theme.isDark = dark
    ctx.commit('setThemeDarkMode', dark)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
