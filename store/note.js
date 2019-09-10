import Vue from 'vue'

export const state = () => ({
  notes: [],
})

export const mutations = {
  addNote(state, note) {
    if(!note || !note.id || !note.type || !note.title || !note.content) {
      console.log("Try to add invalid note: " + JSON.stringify(note))
      return false
    }

    state.notes.push(note)
  },
  editNote(state, note) {
    let index = state.notes.findIndex(r => r.id === note.id)
    if(index === -1) {
      console.log("Try to edit unknown note: " + JSON.stringify(note))
      return false
    }

    Vue.set(state.notes, index, note)
  },
  deleteNote(state, noteId) {
    let index = state.notes.findIndex(r => r.id === noteId)
    state.notes.splice(index, 1)
  }
}

export const getters = {
  getNoteById(state, id) {
    return state.notes.filter(n => n.id === id)[0]
  }
}

export const actions = {
  init(ctx) {
    ctx.commit('addNote', {
      id: '0',
      type: 'text',
      title: 'test text',
      content: {
        markdown: `# RayNote

> A progressive web application (PWA) for notes.

## Build Setup

\`\`\`bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
\`\`\`

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
`
      }
    })
    ctx.commit('addNote', {
      id: '2',
      type: 'text',
      title: 'test text',
      content: {
        text: 'Hello World'
      }
    })
    ctx.commit('addNote', {
      id: '1',
      type: 'picture',
      title: 'test picture',
      content: {
        url: 'https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif'
      }
    })
    ctx.commit('addNote', {
      id: '11',
      type: 'picture',
      title: 'test picture',
      content: {
        url: 'https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif'
      }
    })
    ctx.commit('addNote', {
      id: '12',
      type: 'picture',
      title: 'test picture',
      content: {
        url: 'https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif'
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
