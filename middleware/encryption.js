export default function ({ isHMR, app, store, route, params, error, redirect }) {
  // if we have crypt enabled but not setup-ed we have to redirect to unlock page!

  if(!store.state.settings.encrypted) return
  if(store.state.settings.setupCrypto) return

  if(route.path !== app.router.options.base + "unlock") {
    redirect(`${app.router.options.base}unlock?from=${route.fullPath}`)
  }
}
