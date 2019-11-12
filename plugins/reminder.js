const TICKER_TIME=60000 //1min

const activeNotifications = {}

const checkOverdue = (store, env) => {
  store.dispatch('note/checkOverdueNotes')
    .then(() => {
      if(store.getters['settings/isNotificationEnabled']){
        for(let overdueNote of store.getters['note/getOverdueNotes']){
          if(!activeNotifications[overdueNote.id]) {
            activeNotifications[overdueNote.id] = new Notification(overdueNote.title, {
              icon: `${env.routerBase}icon.png`,
              tag: overdueNote.id,
              requireInteraction: true,
            })
            activeNotifications[overdueNote.id].onclick = () => {
              store.commit('note/removeOverdueAlarm', overdueNote.id)
              delete activeNotifications[overdueNote.id]
            }
          }
        }
      }
    })

  setTimeout(() => {
    checkOverdue(store, env);
  }, TICKER_TIME);
}

export default function ({store, env}) {
  //check but dont blocking!
  setTimeout(() => {
    checkOverdue(store, env)
  }, 1)
}
