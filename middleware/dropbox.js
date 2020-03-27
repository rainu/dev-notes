export default function ({ store }) {
  //this middleware is only responsible for trigger refreshing the dropbox token

  store.dispatch('secrets/refreshDropboxToken')
}
