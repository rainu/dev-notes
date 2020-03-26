import Vue from 'vue'
import shortkey from 'vue-shortkey'
import draggable from 'vuedraggable'
import AudioVisual from 'vue-audio-visual'
import ClickToEdit from '../components/ClickToEdit'
import Audio from '../components/Audio'
import Recorder from '../components/Recorder'

Vue.use(shortkey)
Vue.use(AudioVisual)
Vue.component('draggable', draggable)
Vue.component('ClickToEdit', ClickToEdit)
Vue.component('Audio', Audio)
Vue.component('Recorder', Recorder)
