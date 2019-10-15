import Vue from 'vue'

export const state = () => ({
  secrets: {}
})

export const mutations = {
  applySecrets(state, secrets) {
    for(let secret of secrets) {
      Vue.set(state.secrets, secret.key, secret.value)
    }
  },
}

export const actions = {
  init(ctx) {
    return this.$localStore.getSecrets()
      .then(secrets => {
        if(!secrets) return;

        return ctx.commit('applySecrets', secrets)
      })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
