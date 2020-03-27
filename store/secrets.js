import Vue from 'vue'
import {Dropbox} from "dropbox";

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
  },
  removeSecret(state, key){
    Vue.delete(state.secrets, key)
  },
  setDropboxUser(state, user){
    Vue.set(state.secrets, 'dropbox.user', user)
  }
}

export const getters = {
  getBackupPassword(state) {
    return state.secrets['backup.password']
  },
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

  setSecret(store, {key, value}){
    store.commit('setSecret', {key, value})
    return this.$localStore.setSecret(key, value)
  },
  removeSecret(store, key){
    store.commit('removeSecret', key)
    return this.$localStore.removeSecret(key)
  },

  setBackupPassword(store, password) {
    return store.dispatch('setSecret', {key: 'backup.password', value: password})
  },
  removeBackupPassword(store) {
    return store.dispatch('removeSecret', 'backup.password')
  },

  setAWSS3Settings(store, settings) {
    return store.dispatch('setSecret', {key: 'aws.s3', value: settings})
  },

  setGistSettings(store, settings) {
    return store.dispatch('setSecret', {key: 'gist', value: settings})
  },

  setWebdavSettings(store, settings) {
    return store.dispatch('setSecret', {key: 'webdav', value: settings})
  },

  setDropboxAuth(store, settings) {
    return store.dispatch('setSecret', {key: 'dropbox.auth', value: settings})
  },
  setDropboxSettings(store, settings) {
    return store.dispatch('setSecret', {key: 'dropbox', value: settings})
  },
  removeDropboxAuth(store){
    return Promise.all([
      store.dispatch('setDropboxAuth', {}),
      store.commit('setDropboxUser', {})
    ])
  },
  refreshDropboxToken(store){
    let dpxAuth = store.getters.getDropboxAuth
    if(dpxAuth && dpxAuth.access_token) {
      let dbx = new Dropbox({
        fetch: fetch,
        accessToken: dpxAuth.access_token,
        clientId: process.env.dropbox.clientId,
      })

      return dbx.usersGetCurrentAccount()
        .then(user => store.commit('setDropboxUser', user))
        .catch(() => store.dispatch('removeDropboxAuth'))
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
