import {lazy} from 'react'

export default [
    {
        path: '/team',
        component: lazy(() => import('../../views/team/TeamRequests'))
    }
]
