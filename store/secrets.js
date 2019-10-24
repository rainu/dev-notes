import Vue from 'vue'

export const state = () => ({
  secrets: {
    'dropbox.user': {}
  }
})

export const mutations = {
  applySecret(state, {key, value}){
    Vue.set(state.secrets, key, value)
  },
  setSecret(state, {key, value}){
    Vue.set(state.secrets, key, value)
    this.$localStore.setSecret(key, value)
  },
  setDropboxUser(state, user){
    Vue.set(state.secrets, 'dropbox.user', user)
  }
}

export const getters = {
  getAWSS3Settings(state) {
    return state.secrets['aws.s3']
  },
  getGistSettings(state) {
    return state.secrets['gist']
  },
  getWebdavSettings(state) {
    return state.secrets['webdav']
  },
  getDropboxAuth(state) {
    return state.secrets['dropbox.auth']
  },
  getDropboxUser(state) {
    return state.secrets['dropbox.user']
  },
  getDropboxSettings(state) {
    return state.secrets['dropbox']
  },
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
  },

  setGistSettings(store, settings) {
    store.commit('setSecret', {key: 'gist', value: settings})
  },

  setWebdavSettings(store, settings) {
    store.commit('setSecret', {key: 'webdav', value: settings})
  },

  setDropboxAuth(store, settings) {
    store.commit('setSecret', {key: 'dropbox.auth', value: settings})
  },
  setDropboxSettings(store, settings) {
    store.commit('setSecret', {key: 'dropbox', value: settings})
  },
  removeDropboxAuth(store){
    return Promise.all([
      store.dispatch('setDropboxAuth', {}),
      store.commit('setDropboxUser', {})
    ])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
