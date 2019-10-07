
export default [
  (store, crypto) => new Promise((resolve, reject) => {
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
  (store, crypto) => new Promise((resolve, reject) => {
    //check if there are some notes
    store.notes.keys()
      .then(keys => keys.map(id => store.notes.getItem(id)))
      .then(promises => Promise.all(promises))
      .then(encryptedNotes => encryptedNotes.map(n => crypto.decrypt(n)))
      .then(notes => {
        //create a entry which contains the note order
        return store.notes.setItem('__order', notes.map(n => n.id))
      })
      .then(resolve)
      .catch(reject)
  }),
  (store, crypto) => new Promise((resolve, reject) => {
    //check if there are some notes
    store.notes.keys()
      .then(keys => keys.filter(k => k !== '__order'))
      .then(keys => keys.map(id => store.notes.getItem(id)))
      .then(promises => Promise.all(promises))
      .then(encryptedNotes => encryptedNotes.map(n => crypto.decrypt(n)))
      .then(notes => notes.filter(n => n.type === 'template'))
      .then(notes => notes.map(n => {
        n.content.placeholder = n.content.placeholder.map(p => {
          p.type = 'text'
          return p
        })
        return n
      }))
      .then(notes => {
        //save the new notes
        return notes.forEach(n => store.notes.setItem(n.id, crypto.encrypt(n)))
      })
      .then(resolve)
      .catch(reject)
  }),
]
