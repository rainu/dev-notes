import Vuex from "vuex"
import i18n from './i18n'
import note from './note'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      i18n, note
    },
  })
}

export default createStore;
