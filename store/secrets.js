import Vue from 'vue'

export const state = () => ({
  secrets: {}
})

export const mutations = {
  applySecret(state, {key, value}){
    Vue.set(state.secrets, key, value)
  },
  setSecret(state, {key, value}){
    Vue.set(state.secrets, key, value)
    this.$localStore.setSecret(key, value)
  },
}

export const getters = {
  getAWSS3Settings(state) {
    return state.secrets['aws.s3']
  }
}

export const actions = {
  init(ctx) {
    return this.$localStore.getSecrets()
      .then(secrets => {
        if(!secrets) return;

        return ctx.dispatch('applySecrets', secrets)
      })
  },

  applySecrets(store, secrets) {
    for(let secret of secrets) {
      store.commit('applySecret', secret)
    }
  },
  setAWSS3Settings(store, settings) {
    store.commit('setSecret', {key: 'aws.s3', value: settings})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
