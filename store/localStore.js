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
      version: 1.0,
      storeName: 'meta', // Should be alphanumeric, with underscores.
    }),
    secrets: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'secrets', // Should be alphanumeric, with underscores.
    }),
    settings: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'settings', // Should be alphanumeric, with underscores.
    }),
    notes: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'notes', // Should be alphanumeric, with underscores.
    }),
    deletedNotes: localforage.createInstance({
      name: process.env.appName,
      version: 1.0,
      storeName: 'deleted_notes', // Should be alphanumeric, with underscores.
    }),
    boards: localforage.createInstance({
      name: process.env.appName,
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
        store.deletedNotes.ready(),
        store.boards.ready(),
      ])
      .then(() => this.isEncrypted())
      .then((isEncrypted) => isEncrypted ? Promise.resolve() : this.$migrate())
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
              return migrationSteps[i](store, store.cryptoModule)
            }).then(() => {
              return store.meta.setItem(KEY_VERSION, i + 1)
            })
          }

          return p
        })
    },

    setupEncryptionModule(secret){
      store.cryptoModule = crypto(secret)
      return this.$migrate()
    },

    isEncrypted(){
      return store.settings.getItem('encrypted')
    },
    checkSecret(secret){
      return store.settings.getItem('encryption_check')
        .then(encryptedValue => crypto(secret).decrypt(encryptedValue) === CRYPTO_CHECK)
    },
    enableEncryption(secret){
      return Promise.all([this.getNotes(), this.getSecrets()])
        .then(([plainNotes, plainSecrets]) => {
          this.setupEncryptionModule(secret)

          //encrypt the notes with the new secret
          let p = []
          for(let note of Object.values(plainNotes)) {
            p.push(this.setNote(note))
          }

          //encrypt the secrets with the new secret
          for(let secret of Object.values(plainSecrets)){
            p.push(this.setSecret(secret.key, secret.value))
          }

          return Promise.all(p)
        })
        .then(() => store.settings.setItem('encryption_check', crypto(secret).encrypt(CRYPTO_CHECK)))
        .then(() => store.settings.setItem('encrypted', true))
    },
    disableEncryption(){
      return Promise.all([this.getNotes(), this.getSecrets()])
        .then(([plainNotes, plainSecrets]) => {
          store.cryptoModule = noCrypto

          //decrypt the notes
          let p = []
          for(let note of Object.values(plainNotes)) {
            p.push(this.setNote(note))
          }

          //decrypt the secrets
          for(let secret of Object.values(plainSecrets)){
            p.push(this.setSecret(secret.key, secret.value))
          }

          return Promise.all(p)
        })
        .then(() => store.settings.removeItem('encryption_check'))
        .then(() => store.settings.setItem('encrypted', false))
    },

    removeSecret(key) {
      return store.secrets.removeItem(key)
    },
    setSecret(key, value) {
      return store.secrets.setItem(key, store.cryptoModule.encrypt(value))
    },
    getSecret(key) {
      return store.secrets.getItem(key)
        .then(secret => secret ? store.cryptoModule.decrypt(secret) : secret)
    },
    getSecrets(){
      return store.secrets.keys()
        .then(keys => keys.map(key => this.getSecret(key).then(secret => ({key: key, value: secret}))))
        .then(promises => Promise.all(promises))
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
    setDateTimeFormat(format) {
      return store.settings.setItem('date.timeFormat', format)
    },
    getDateTimeFormat() {
      return store.settings.getItem('date.timeFormat')
    },
    setDateFirstDay(day) {
      return store.settings.setItem('date.firstDay', day)
    },
    getDateFirstDay() {
      return store.settings.getItem('date.firstDay')
    },
    getNoteSize(){
      return store.settings.getItem('note.size')
    },
    setNoteSize(fixed, size){
      return store.settings.setItem('note.size', {
        fixed, size
      })
    },
    getNoteDeleteHard(){
      return store.settings.getItem('note.deleteHard')
    },
    setNoteDeleteHard(mode){
      return store.settings.setItem('note.deleteHard', mode)
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
    setDeletedNote(note) {
      return store.deletedNotes.setItem(note.id, store.cryptoModule.encrypt(note))
    },
    removeDeletedNote(id) {
      return store.deletedNotes.removeItem(id)
    },
    getDeletedNote(id) {
      return store.deletedNotes.getItem(id)
      .then(note => store.cryptoModule.decrypt(note))
    },
    getDeletedNotes(){
      return store.deletedNotes.keys()
      .then(keys => keys.map(id => this.getDeletedNote(id)))
      .then(promises => Promise.all(promises))
    },
    getNoteOrder(){
      return store.notes.getItem(ORDER_KEY)
        .then(order => !order ? [] : order)
    },
    setNoteOrder(order) {
      return store.notes.setItem(ORDER_KEY, order)
    },
    clearNotes(){
      return store.notes.clear()
    },
    clearDeletedNotes(){
      return store.deletedNotes.clear()
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
        .then(order => !order ? [] : order)
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
