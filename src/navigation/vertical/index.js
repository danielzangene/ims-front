import {User} from 'react-feather'
import cartable from "./cartable"
import dashboard from "./dashboard"
import team from "./team"
import setting from "./setting"
import profile from "./profile"
import dining from "./dining"

export default [
    ...dashboard,
    ...profile,
    ...team,
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
