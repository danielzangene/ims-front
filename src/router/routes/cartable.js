import {lazy} from 'react'

export default [
    {
        path: '/footwork',
        component: lazy(() => import('../../views/foorwork/FootWork'))
    },
    {
        path: '/leaveRequest',
        component: lazy(() => import('../../views/foorwork/LeaveRequest'))
    }
]
