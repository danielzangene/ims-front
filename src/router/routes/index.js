import {lazy} from 'react'
import cartable from "./cartable"
import team from "./team"
import dashboard from "./dashboard"
import dining from "./dining"

// ** Document title
const TemplateTitle = '%s - سامانه مدیریتی'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...team,
    ...dashboard,
    ...cartable,
    ...dining,
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile'))
  },
  {
    path: '/test',
    component: lazy(() => import('../../views/Test'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
