import {User} from 'react-feather'
import cartable from "./cartable"
import dashboard from "./dashboard"
import team from "./team"
import setting from "./setting"
import profile from "./profile"
import dining from "./dining"
import chat from "./chat"

export default [
    ...dashboard,
    ...profile,
    ...team,
    ...chat,
    ...cartable,
    ...dining,
    ...setting,
    {
        id: 'test',
        title: 'تست',
        icon: <User size={20}/>,
        navLink: '/test'
    }
]
