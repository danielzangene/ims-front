import {lazy} from 'react'

export default [
    {
        path: '/dining',
        component: lazy(() => import('../../views/dining'))
    }
]
