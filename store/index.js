import Vuex from "vuex"
import i18n from './i18n'
import note from './note'
import board from './board'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      i18n, note, board
    },
  })
}

export default createStore;
