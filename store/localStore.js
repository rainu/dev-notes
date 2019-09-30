//this is not a vuex-store! but a file for our localforage store
import localforage from 'localforage'
import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";
import migrationSteps from './localStoreMigrations'

const ORDER_KEY = "__order"
const CRYPTO_CHECK = "ENCRYPTION_CHECK"

const noCrypto = {
  encrypt: (data) => data,
  decrypt: (data) => data,
}

const crypto = (secret) => {
  const cryptoModule = new SimpleCrypto(secret)
  return {
    encrypt: (data) => cryptoModule.encrypt(JSON.stringify(data)),
    decrypt: (data) => JSON.parse(cryptoModule.decrypt(data))
  }
}

export function newLocalStore() {
  const store = {
    cryptoModule: noCrypto,
    meta: localforage.createInstance({
      name: process.env.appName,
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'meta', // Should be alphanumeric, with underscores.
    }),
    settings: localforage.createInstance({
      name: process.env.appName,
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'settings', // Should be alphanumeric, with underscores.
    }),
    notes: localforage.createInstance({
      name: process.env.appName,
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'notes', // Should be alphanumeric, with underscores.
    }),
    boards: localforage.createInstance({
      name: process.env.appName,
      driver: localforage.INDEXEDDB,
      version: 1.0,
      storeName: 'boards', // Should be alphanumeric, with underscores.
    }),
  }

  return {
    ready() {
      return Promise.all([
        store.meta.ready(),
        store.settings.ready(),
        store.notes.ready(),
        store.boards.ready(),
      ]).then(() => this.$migrate())
    },

    $migrate(){
      const KEY_VERSION = 'version.store'

      //get the current schema version
      return store.meta.getItem(KEY_VERSION)
        .then(storeVersion => {
          let currentMigrationVersion = storeVersion ? storeVersion : 0

          let p = Promise.resolve()
          for(let i = currentMigrationVersion; i < migrationSteps.length; i++) {
            p = p.then(() => {
              console.log(`Migration: do Step ${i + 1} of ${migrationSteps.length}`)
              return migrationSteps[i](store)
            }).then(() => {
              return store.meta.setItem(KEY_VERSION, i + 1)
            })
          }

          return p
        })
    },

    setupEncryptionModule(secret){
      store.cryptoModule = crypto(secret)
    },

    isEncrypted(){
      return store.settings.getItem('encrypted')
    },
    checkSecret(secret){
      return store.settings.getItem('encryption_check')
        .then(encryptedValue => crypto(secret).decrypt(encryptedValue) === CRYPTO_CHECK)
    },
    enableEncryption(secret){
      return this.getNotes()
        .then(plainNotes => {
          this.setupEncryptionModule(secret)

          //encrypt the notes with the new secret
          let p = []
          for(let note of Object.values(plainNotes)) {
            p.push(this.setNote(note))
          }

          return Promise.all(p)
        })
        .then(() => store.settings.setItem('encryption_check', crypto(secret).encrypt(CRYPTO_CHECK)))
        .then(() => store.settings.setItem('encrypted', true))
    },
    disableEncryption(){
      return this.getNotes()
        .then(plainNotes => {
          store.cryptoModule = noCrypto

          //decrypt the notes
          let p = []
          for(let note of Object.values(plainNotes)) {
            p.push(this.setNote(note))
          }

          return Promise.all(p)
        })
        .then(() => store.settings.removeItem('encryption_check'))
        .then(() => store.settings.setItem('encrypted', false))
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
        .then(note => store.cryptoModule.decrypt(note))
    },
    getNotes(){
      return store.notes.keys()
        .then(keys => keys.filter(k => k !== ORDER_KEY).map(id => this.getNote(id)))
        .then(promises => Promise.all(promises))
    },
    setNote(note) {
      return store.notes.setItem(note.id, store.cryptoModule.encrypt(note))
    },
    removeNote(id) {
      return store.notes.removeItem(id)
    },
    getNoteOrder(){
      return store.notes.getItem(ORDER_KEY)
    },
    setNoteOrder(order) {
      return store.notes.setItem(ORDER_KEY, order)
    },
    clearNotes(){
      return store.notes.clear()
    },
    getBoard(id) {
      return store.boards.getItem(id)
    },
    getBoards(){
      return store.boards.keys()
        .then(keys => keys.filter(k => k !== ORDER_KEY).map(id => this.getBoard(id)))
        .then(promises => Promise.all(promises))
    },
    setBoard(board) {
      return store.boards.setItem(board.id, board)
    },
    getBoardOrder(){
      return store.boards.getItem(ORDER_KEY)
    },
    setBoardOrder(order) {
      return store.boards.setItem(ORDER_KEY, order)
    },
    removeBoard(id) {
      return store.boards.removeItem(id)
    },
    clearBoards(){
      return store.boards.clear()
    }
  }
}
