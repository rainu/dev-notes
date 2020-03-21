import Vue from 'vue'
import shortkey from 'vue-shortkey'
import draggable from 'vuedraggable'
import ClickToEdit from '../components/ClickToEdit'

Vue.use(shortkey)
Vue.component('draggable', draggable)
Vue.component('ClickToEdit', ClickToEdit)
