import Vue from 'vue'

export const state = () => ({
  notes: [],
})

export const mutations = {
  loadNote(state, note) {
    state.notes.push(note)
  },
  addNote(state, note) {
    if(!note || !note.id || !note.type || !note.title || !note.content) {
      console.log("Try to add invalid note: " + JSON.stringify(note))
      return false
    }

    state.notes.push(note)
    this.$localStore.setNote(note)
  },
  editNote(state, note) {
    let index = state.notes.findIndex(r => r.id === note.id)
    if(index === -1) {
      console.log("Try to edit unknown note: " + JSON.stringify(note))
      return false
    }

    Vue.set(state.notes, index, note)
    this.$localStore.setNote(note)
  },
  deleteNote(state, noteId) {
    let index = state.notes.findIndex(r => r.id === noteId)
    state.notes.splice(index, 1)

    this.$localStore.removeNote(noteId)
  },
  clearNotes(state){
    state.notes = []
    this.$localStore.clearNotes()
  },
}

export const getters = {
  getNoteById(state, id) {
    return state.notes.filter(n => n.id === id)[0]
  },
  getAvailableTags(state) {
    let tagMap = {}
    for(let note of state.notes) {
      if(note.tags) {
        for(let curTag of note.tags) {
          tagMap[curTag] = true
        }
      }
    }

    return Object.keys(tagMap).sort()
  }
}

export const actions = {
  init(ctx) {
    this.$localStore.getNotes()
      .then(notes => {
        for(let note of notes) {
          ctx.commit('loadNote', note)
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
