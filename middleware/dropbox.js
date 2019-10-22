import { Dropbox } from "dropbox";

const refreshToken = (store) => {
  let dpxAuth = store.getters['secrets/getDropboxAuth']
  if(dpxAuth && dpxAuth.access_token) {
    let dbx = new Dropbox({
      fetch: fetch,
      accessToken: dpxAuth.access_token,
      clientId: process.env.dropbox.clientId,
    })

    dbx.usersGetCurrentAccount()
      .then(user => store.commit('secrets/setDropboxUser', user))
  }
}

export default function ({ isHMR, app, store, route, params, error, redirect }) {
  //dropbox use a oath2 auth workflow. that means the user will be redirected
  //to the dropbox' login masked and after the login was successfully dropbox
  //redirects the user back to our web-app

  //this middleware is responsible for reading the dropbox auth token and store
  //them into our store

  let recall = route.query.recall && route.query.recall === 'dropbox' && route.hash
  if(!recall) {
    refreshToken(store)
    return
  }

  let hashParams = new URLSearchParams(route.hash.substring(1))
  let authParams = {}
  for(let [key, value] of hashParams.entries()) {
    authParams[key] = value
  }

  store.dispatch('secrets/setDropboxAuth', authParams)
    .then(() => redirect(`/backup`))
    .then(() => refreshToken(store))
}
