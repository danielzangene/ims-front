import {lazy} from 'react'

export default [
    {
        path: '/chat',
        component: lazy(() => import('../../views/chat'))
    }
]
