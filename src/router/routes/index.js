import {lazy} from 'react'
import cartable from "./cartable"
import dashboard from "./dashboard"

// ** Document title
const TemplateTitle = '%s - سامانه مدیریتی'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...dashboard,
    ...cartable,
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
