import i18n from '../locales'

export const state = () => ({
  locales: i18n.locales,
  locale: i18n.defaultLocale
})

export const mutations = {
  setLang(state, lang) {
    if (state.locales.indexOf(lang) !== -1) {
      state.locale = lang

      this.$localStore.setLanguage(lang)
    }
  }
}

export const actions = {
  init(ctx) {
    return this.$localStore.getLanguage()
      .then(lang => {
        if(lang){
          return ctx.dispatch('applyLanguage', lang)
        }
      })
  },
  applyLanguage(ctx, lang) {
    this.app.i18n.locale = lang
    ctx.commit('setLang', lang)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
