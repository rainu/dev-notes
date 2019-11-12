export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // check if the browser supports notifications
  if ("Notification" in window) {
    store.commit('settings/setNotificationSupported', true)
  } else {
    //notification are not supported!
    return
  }

  if (Notification.permission === "granted"){
    store.commit('settings/setNotificationGranted', true)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      store.commit('settings/setNotificationGranted', permission === "granted")
    })
  }
}
