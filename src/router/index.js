import Vue from 'vue'
import Router from 'vue-router'
import locales from 'i18n/locales'
import manual from './manual'
import { loadView, loadDoc} from 'src/utils/lazyLoading'
Vue.use(Router)

const defaultPath = '/zh-CN'

function generateRouteByLang (items, lang, routes = []) {
  for (let i = 0, l = items.length; i < l; i++) {
    let item = items[i]
    if (item.name && !item.lableOnly) {
      routes.push({
        name: item.name + '-' + lang,
        path: lang + '/' + item.name.toLowerCase(),
        component: loadView(item.name),
        meta: {
          label: locales[lang][item.name.toLowerCase()],
          icon: item.icon
        }
      })
    } 

    if (item.children) {
      generateRouteByLang(item.children, lang, routes)
    }
  }

  return routes
}

function generateRoutes (items) {
  let routes = []
  let langs = Object.keys(locales)

  for (let idx = 0, len = langs.length; idx < len; idx++) {
    routes.push(...generateRouteByLang(items, langs[idx]))
  }

  return routes
}

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home-zh-CN',
      path: '/home',
      component: loadView('Home')
    },
    {
      name: 'Search-zh-CN',
      path: '/info',
      component: loadView('Table')
    },
    {
      name: 'Login-zh-CN',
      path: '/login',
      component: loadView('Login')
    },
    {
      name: 'Manual-zh-CN',
      path: '/manual',
      component: loadView('Manual'),

      children: generateRoutes(manual)
    },
		{
			name: 'About-zh-CN',
			path: '/about',
			component: loadView('about')
		},
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
