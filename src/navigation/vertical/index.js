import { Mail, Home, User } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'خانه',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'profile',
    title: 'پروفایل',
    icon: <User size={20} />,
    navLink: '/profile'
  },
  {
    id: 'test',
    title: 'تست',
    icon: <User size={20} />,
    navLink: '/test'
  }
]
