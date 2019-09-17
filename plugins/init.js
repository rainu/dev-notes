//init stuff here

export default function ({app, store}) {
  return Promise.all([
    store.dispatch('i18n/init'),
    store.dispatch('note/init'),
    store.dispatch('board/init'),
  ]);
}
