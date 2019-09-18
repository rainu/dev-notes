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
    boards: localforage.createInstance({
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'boards', // Should be alphanumeric, with underscores.
    }),
  }

  return {
    ready() {
      return Promise.all([
        store.settings.ready(),
        store.notes.ready(),
        store.boards.ready(),
      ])
    },
    getLanguage(){
      return store.settings.getItem('language')
    },
    setLanguage(lang){
      return store.settings.setItem('language', lang)
    },
    setThemeDarkMode(dark) {
      return store.settings.setItem('theme.dark', dark)
    },
    getThemeDarkMode() {
      return store.settings.getItem('theme.dark')
    },
    getNoteSize(){
      return store.settings.getItem('note.size')
    },
    setNoteSize(fixed, size){
      return store.settings.setItem('note.size', {
        fixed, size
      })
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
    },
    getBoard(id) {
      return store.boards.getItem(id)
    },
    getBoards(){
      return store.boards.keys()
        .then(keys => keys.map(id => this.getBoard(id)))
        .then(promises => Promise.all(promises))
    },
    setBoard(board) {
      return store.boards.setItem(board.id, board)
    },
    removeBoard(id) {
      return store.boards.removeItem(id)
    }
  }
}
