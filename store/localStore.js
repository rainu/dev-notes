//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'

export function newLocalStore() {
  const store = {
    settings: localforage.createInstance({
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'settings', // Should be alphanumeric, with underscores.
    }),
    notes: localforage.createInstance({
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'notes', // Should be alphanumeric, with underscores.
    }),
  }

  return {
    ready() {
      return Promise.all([
        store.settings.ready(),
        store.notes.ready(),
      ])
    },
    getLanguage(){
      return store.settings.getItem('language')
    },
    setLanguage(lang){
      return store.settings.setItem('language', lang)
    },
    getNote(id) {
      return store.notes.getItem(id)
    },
    getNotes(){
      return store.notes.keys()
        .then(keys => keys.map(id => this.getNote(id)))
        .then(promises => Promise.all(promises))
    },
    setNote(note) {
      return store.notes.setItem(note.id, note)
    },
    removeNote(id) {
      return store.notes.removeItem(id)
    }
  }
}
