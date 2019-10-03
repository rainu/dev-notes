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
  }
]

const CURRENT_VERSION = migrationSteps.length

export const exportAll = (notes, boards, boardOrder, noteOrder) => {
  let exportObj = {
    version: CURRENT_VERSION,
    notes: {},
    boards: {},
    boardOrder: boardOrder,
    noteOrder: noteOrder,
  }

  for(let note of notes) {
    exportObj.notes[note.id] = note
  }

  for(let board of boards) {
    exportObj.boards[board.id] = board
  }

  return exportObj
}

export const importAll = (json) => {
  let parsed = {}
  try {
    parsed = JSON.parse(json)
  }catch(e) {
    return new Error(e)
  }

  if(parsed.version !== CURRENT_VERSION) {
    parsed = migrate(parsed)
  }

  let notes = []
  let boards = []

  if(parsed.notes) for(let noteId of Object.keys(parsed.notes)) notes.push(parsed.notes[noteId])
  if(parsed.boards) for(let boardId of Object.keys(parsed.boards)) boards.push(parsed.boards[boardId])

  return {
    notes, boards
  }
}

const migrate = (data) => {
  for(let i = data.version; i < migrationSteps.length; i++) {
    console.log(`Import-Migration: do Step ${i + 1} of ${migrationSteps.length}`)
    data = migrationSteps[i](data)
    data.version = i + 1
  }

  return data
}
