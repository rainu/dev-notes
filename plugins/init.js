//init stuff here

export default function ({app, store}) {
  return Promise.all([
    store.dispatch('settings/init'),
    store.dispatch('note/init'),
    store.dispatch('board/init'),
  ]);
}
