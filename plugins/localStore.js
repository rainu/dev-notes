import Vue from 'vue'
import * as LocalStore from '../store/localStore'

const localStore = LocalStore.newLocalStore()

Vue.prototype.$localStore = localStore

//we have to wait for our indexdb(localforage) instances to be ready
export default function ({app, store}) {
  app.$localStore = localStore
  store.$localStore = localStore

  return localStore.ready()
}
