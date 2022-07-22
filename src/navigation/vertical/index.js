import {User} from 'react-feather'
import cartable from "./cartable"
import dashboard from "./dashboard"

export default [
    ...dashboard,
    ...cartable,
    {
        id: 'profile',
        title: 'پروفایل',
        icon: <User size={20}/>,
        navLink: '/profile'
    },
    {
        id: 'test',
        title: 'تست',
        icon: <User size={20}/>,
        navLink: '/test'
    }
]
