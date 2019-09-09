//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'

export function newLocalStore() {
  const store = {
    settings: localforage.createInstance({
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'settings', // Should be alphanumeric, with underscores.
    }),
  }

  return {
    ready() {
      return Promise.all([
        store.settings.ready(),
      ])
    },
    getLanguage(){
      return store.settings.getItem('language')
    },
    setLanguage(lang){
      return store.settings.setItem('language', lang)
    },
  }
}
