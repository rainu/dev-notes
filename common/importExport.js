import SimpleCrypto from "simple-crypto-js/build/SimpleCrypto";

const migrationSteps = [
  (data) => data, //there is already a version 1 out there
  (data) => {
    //IN: { notes: {..}, boards: {..} }
    //OUT: { notes: {..}, boards: {..}, boardOrder: [..] }

    data.boardOrder = Object.keys(data.boards)
    return data
  },
  (data) => {
    //IN: { notes: {..}, boards: {..}, boardOrder: [..] }
    //OUT: { notes: {..}, boards: {..}, boardOrder: [..], noteOrder: [...] }

    data.noteOrder = Object.keys(data.notes)
    return data
  },
  (data) => {
    //IN: { notes: { 'id': { type: 'template', content: { placeholder:[{..}] }} } }
    //OUT: { notes: { 'id': { type: 'template', content: { placeholder:[{ type: 'text', ..}] }} } }

    for(let noteId of Object.keys(data.notes).filter(nId => data.notes[nId].type === 'template')){
      data.notes[noteId].content.placeholder = data.notes[noteId].content.placeholder.map(p => {
        p.type = 'text'
        return p
      })
    }

    return data
  },
  (data) => {
    //IN: { ... }
    //OUT: { encryption: { enabled: false, check: null } }

    data.encryption = {
      enabled: false,
      check: null,
    }

    return data
  }
]

const CURRENT_VERSION = migrationSteps.length
const ENCRYPTION_CHECK = "ENCRYPTION_CHECK"

export const exportAll = (password, notes, boards, boardOrder, noteOrder) => {
  let exportObj = {
    version: CURRENT_VERSION,
    encryption: {
      enabled: false,
    },
    notes: {},
    boards: {},
    boardOrder: boardOrder,
    noteOrder: noteOrder,
  }

  let encrypt = (data) => data
  if(password) {
    exportObj.encryption.enabled = true

    const cryptoModule = new SimpleCrypto(password)
    encrypt = (data) => cryptoModule.encrypt(JSON.stringify(data))
    exportObj.encryption.check = encrypt(ENCRYPTION_CHECK)
  }

  for(let note of notes) {
    exportObj.notes[note.id] = encrypt(note)
  }

  for(let board of boards) {
    exportObj.boards[board.id] = encrypt(board)
  }

  return exportObj
}

export const importAll = (json, pwCallback) => {
  let parsed = {}

  if(json && json.version) {
    parsed = json
  } else {
    try {
      parsed = JSON.parse(json)
    } catch (e) {
      return Promise.reject(new Error(e))
    }
  }

  if(parsed.version !== CURRENT_VERSION) {
    parsed = migrate(parsed)
  }

  let pwPromise = Promise.resolve(null)
  if(parsed.encryption.enabled) {
    pwPromise = pwCallback
  }

  return pwPromise.then(
    (password) => {
      return new Promise((resolve, reject) => {
        let decrypt = (data) => data

        if(parsed.encryption.enabled) {
          try{
            const cryptoModule = new SimpleCrypto(password)
            decrypt = (data) => JSON.parse(cryptoModule.decrypt(data))

            //here we check if the user choose the right password
            if(decrypt(parsed.encryption.check) !== ENCRYPTION_CHECK){
              reject(new Error("password is incorrect"))
              return
            }
          }catch(e) {
            reject(e)
            return
          }
        }

        let notes = []
        let boards = []

        if(parsed.notes) for(let noteId of Object.keys(parsed.notes)) notes.push(decrypt(parsed.notes[noteId]))
        if(parsed.boards) for(let boardId of Object.keys(parsed.boards)) boards.push(decrypt(parsed.boards[boardId]))

        resolve({
          notes, boards
        })
      })
    }
  )
}

const migrate = (data) => {
  for(let i = data.version; i < migrationSteps.length; i++) {
    console.log(`Import-Migration: do Step ${i + 1} of ${migrationSteps.length}`)
    data = migrationSteps[i](data)
    data.version = i + 1
  }

  return data
}
