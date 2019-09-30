
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
]
