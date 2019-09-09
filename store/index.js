import Vuex from "vuex"
import i18n from './i18n'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      i18n
    },
  })
}

export default createStore;
