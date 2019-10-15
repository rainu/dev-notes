import Vuex from "vuex"
import settings from './settings'
import note from './note'
import board from './board'
import secrets from './secrets'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, note, board, secrets
    },
  })
}

export default createStore;
