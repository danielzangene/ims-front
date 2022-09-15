import {lazy} from 'react'

export default [
    {
        path: '/fiscal',
        component: lazy(() => import('../../views/fiscal/index'))
    },
    {
        path: '/footwork',
        component: lazy(() => import('../../views/foorwork/FootWork'))
    },
    {
        path: '/leaveRequest',
        component: lazy(() => import('../../views/foorwork/LeaveRequest'))
    }
]
