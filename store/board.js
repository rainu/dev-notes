import Vue from 'vue'

export const state = () => ({
  boards: [],
  boardOrder: []
})

export const mutations = {
  loadBoards(state, {boards, order}) {
    state.boards.push(...boards)
    state.boardOrder.push(...order)
  },
  setBoardOrder(state, order) {
    if(state.boards.length !== order.length) {
      console.log("Try to set invalid board order!")
      return false
    }

    state.boardOrder = order
  },
  addBoard(state, board) {
    if(!board || !board.id || !board.title || !board.icon || !board.filter) {
      console.log("Try to add invalid board: " + JSON.stringify(board))
      return false
    }

    state.boards.push(board)
    state.boardOrder.push(board.id)
  },
  editBoard(state, board) {
    let index = state.boards.findIndex(r => r.id === board.id)
    if(index === -1) {
      console.log("Try to edit unknown board: " + JSON.stringify(board))
      return false
    }

    Vue.set(state.boards, index, board)
  },
  deleteBoard(state, boardId) {
    let index = state.boards.findIndex(r => r.id === boardId)
    state.boards.splice(index, 1)

    index = state.boardOrder.findIndex(bId => bId === boardId)
    state.boardOrder.splice(index, 1)
  },
  clearBoards(state){
    state.boards = []
    state.boardOrder = []
  },
}

export const getters = {
  getBoardById(state, id) {
    return state.boards.filter(n => n.id === id)[0]
  },
  getAvailableTags(state) {
    let tagMap = {}
    for(let board of state.boards) {
      if(board.filter.tags) {
        for(let curTag of Object.keys(board.filter.tags)) {
          tagMap[curTag] = true
        }
      }
    }

    return Object.keys(tagMap).sort()
  },
  getUsedColors(state) {
    let colors = {}
    for(let board of state.boards) {
      if(board.color) {
        colors[board.color.toUpperCase()] = ""
      }
    }

    return Object.keys(colors).sort()
  }
}

export const actions = {
  init(ctx) {
    return Promise.all([this.$localStore.getBoards(), this.$localStore.getBoardOrder()])
      .then(([boards, order]) => ctx.commit('loadBoards', {boards, order}))
  },

  setBoardOrder(ctx, order) {
    ctx.commit('setBoardOrder', order)
    return this.$localStore.setBoardOrder(ctx.state.boardOrder)
  },
  addBoard(ctx, board) {
    ctx.commit('addBoard', board)

    return Promise.all([
      this.$localStore.setBoard(board),
      this.$localStore.setBoardOrder(ctx.state.boardOrder)
    ])
  },
  editBoard(ctx, board) {
    ctx.commit('editBoard', board)
    return this.$localStore.setBoard(board)
  },
  deleteBoard(ctx, boardId) {
    ctx.commit('deleteBoard', boardId)

    return Promise.all([
      this.$localStore.removeBoard(boardId),
      this.$localStore.setBoardOrder(ctx.state.boardOrder)
    ])
  },
  clearBoards(ctx){
    ctx.commit('clearBoards')
    return this.$localStore.clearBoards()
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
