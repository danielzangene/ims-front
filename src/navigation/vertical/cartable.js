import {Circle, Layers} from 'react-feather'

export default [
    {
        id: 'cartable',
        title: 'کارکرد',
        icon: <Layers/>,
        children: [
            {
                id: 'financial',
                title: 'دوره مالی',
                icon: <Circle className='mx-1' size={20}/>,
                navLink: '/test'
            },
            {
                id: 'personalSchedule',
                title: 'برنامه زمانی',
                icon: <Circle className='mx-1' size={20}/>,
                navLink: '/test'
            },
            {
                id: 'personalRequest',
                title: 'مرخصی',
                icon: <Circle className='mx-1' size={20}/>,
                navLink: '/leaveRequest'
            },
            {
                id: 'footwork',
                title: 'ساعت کاری',
                icon: <Circle className='mx-1' size={20}/>,
                navLink: '/footwork'
            }
        ]
    }
]
