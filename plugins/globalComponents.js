import Vue from 'vue'
import shortkey from 'vue-shortkey'
import draggable from 'vuedraggable'
import ClickToEdit from '../components/ClickToEdit'
import Audio from '../components/Audio'
import Recorder from '../components/Recorder'

Vue.use(shortkey)
Vue.component('draggable', draggable)
Vue.component('ClickToEdit', ClickToEdit)
Vue.component('Audio', Audio)
Vue.component('Recorder', Recorder)
