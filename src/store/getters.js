const app = state => state.app
const device = state => state.app.device
const sidebar = state => state.app.sidebar
const effect = state => state.app.effect
const current = state => state.app.current
const port= state => state.app.db.port.map(it => it.data())
const carrier= state => state.app.db.carrier.map(it => it.data())
const country= state => state.app.db.country.map(it => it.data())
const user = state => state.app.db.user


export {
  app,
  device,
  sidebar,
  effect,
  current,
  port,
  carrier,
  country,
  user
}
