import {lazy} from 'react'

export default [
    {
        path: '/chat',
        appLayout: true,
        className: "chat-application",
        component: lazy(() => import('../../views/chat'))
    }
]
