export const exportAll = (notes, boards) => {
  let exportObj = {
    version: 1,
    notes: {},
    boards: {}
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

  if(parsed.version !== 1) {
    return new Error('Invalid version')
  }

  let notes = []
  let boards = []

  if(parsed.notes) for(let noteId of Object.keys(parsed.notes)) notes.push(parsed.notes[noteId])
  if(parsed.boards) for(let boardId of Object.keys(parsed.boards)) boards.push(parsed.boards[boardId])

  return {
    notes, boards
  }
}
