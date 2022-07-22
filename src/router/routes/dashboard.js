import {lazy} from 'react'

export default [
    {
        path: '/home',
        component: lazy(() => import('../../views/dashboard/Home'))
    }
]
