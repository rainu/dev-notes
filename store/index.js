import Vuex from "vuex"
import settings from './settings'
import note from './note'
import board from './board'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      settings, note, board
    },
  })
}

export default createStore;
