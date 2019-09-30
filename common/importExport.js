const migrationSteps = [
  (data) => data, //there is already a version 1 out there
  (data) => {
    //IN: { notes: {..}, boards: {..} }
    //OUT: { notes: {..}, boards: {..}, boardOrder: [..] }

    data.boardOrder = Object.keys(data.boards)
    return data
  }
]

const CURRENT_VERSION = migrationSteps.length

export const exportAll = (notes, boards, boardOrder) => {
  let exportObj = {
    version: CURRENT_VERSION,
    notes: {},
    boards: {},
    boardOrder: boardOrder
  }

  for(let note of notes) {
    exportObj.notes[note.id] = note
  }

  for(let board of boards) {
    exportObj.boards[board.id] = board
  }

  console.log(exportObj)
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
