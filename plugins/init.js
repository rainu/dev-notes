//init stuff here

export default function ({app, store}) {
  return store.dispatch('settings/init').then(() => {
    //if there is encrypted content -> the middleware should redirect to
    //unlock page. And the unlock page should initialise the rest of the store!

    if(!store.state.settings.encrypted) {
      return Promise.all([
        store.dispatch('note/init'),
        store.dispatch('board/init'),
        store.dispatch('secrets/init'),
      ])
    }
  });
}
