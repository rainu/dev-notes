
export default [
  (store) => new Promise((resolve, reject) => {
    //check if there are some boards
    store.boards.keys()
      .then(keys => keys.map(id => store.boards.getItem(id)))
      .then(promises => Promise.all(promises))
      .then(boards => {
        //create a entry which contains the board order
        return store.boards.setItem('__order', boards.map(b => b.id))
      })
      .then(resolve)
      .catch(reject)
  }),
  (store) => new Promise((resolve, reject) => {
    //check if there are some notes
    store.notes.keys()
      .then(keys => keys.map(id => store.notes.getItem(id)))
      .then(promises => Promise.all(promises))
      .then(notes => {
        //create a entry which contains the note order
        return store.notes.setItem('__order', notes.map(n => n.id))
      })
      .then(resolve)
      .catch(reject)
  }),
]
