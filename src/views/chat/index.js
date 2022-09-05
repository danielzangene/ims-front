// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Chat App Component Imports
import Chat from './Chat'
import Sidebar from './SidebarLeft'
import UserProfileSidebar from './UserProfileSidebar'

// ** Third Party Components
import classnames from 'classnames'

// ** Store & Actions
import '../../@core/scss/base/pages/app-chat.scss'
import '../../@core/scss/base/pages/app-chat-list.scss'

const AppChat = () => {
  // ** Store Vars
  const chats = [
    {
      id: 1,
      userId: 1,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'If it takes long you can mail me at my mail address.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 11
        }
      ]
    },
    {
      id: 2,
      userId: 2,
      unseenMsgs: 1,
      chat: [
        {
          message: "How can we help? We're here for you!",
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 5 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 5 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Hey John, I am looking for the best admin template. Could you please help me to find it out?',
          time: 'Mon Dec 10 2018 07:45:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'It should be Bootstrap 5 compatible.',
          time: 'Mon Dec 10 2018 07:45:55 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Absolutely!',
          time: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Modern admin is the responsive bootstrap 5 admin template.!',
          time: 'Mon Dec 10 2018 07:46:05 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'Looks clean and fresh UI.',
          time: 'Mon Dec 10 2018 07:46:23 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: "It's perfect for my next project.",
          time: 'Mon Dec 10 2018 07:46:33 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'How can I purchase it?',
          time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
          senderId: 1
        },
        {
          message: 'Thanks, from ThemeForest.',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 11
        },
        {
          message: 'I will purchase it for sure. 👍',
          time: 'Mon Dec 10 2018 07:46:53 GMT+0000 (GMT)',
          senderId: 1
        }
      ]
    }
  ]
  const store = {
    chats: [
      {
        id: 1,
        fullName: "Felecia Rower",
        role: "Frontend Developer",
        about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
        avatar: "/static/media/avatar-s-1.d383013d.jpg",
        status: "offline",
        chat: {
          id: 1,
          unseenMsgs: 0,
          lastMessage: {
            message: "If it takes long you can mail me at my mail address.",
            time: "2022-08-31T08:19:23.830Z",
            senderId: 11
          }
        }
      },
      {
        id: 2,
        fullName: "Adalberto Granzin",
        role: "UI/UX Designer",
        about: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
        avatar: "/static/media/avatar-s-1.d383013d.jpg",
        status: "busy",
        chat: {
          id: 2,
          unseenMsgs: 1,
          lastMessage: {
            message: "I will purchase it for sure. 👍",
            time: "2022-09-01T08:19:23.830Z",
            senderId: 1
          }
        }
      }
    ],
    contacts: [
      {
        id: 1,
        fullName: "Felecia Rower",
        role: "Frontend Developer",
        about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
        avatar: "/static/media/avatar-s-1.d383013d.jpg",
        status: "offline",
        chat: {
          id: 1,
          unseenMsgs: 0,
          lastMessage: {
            message: "If it takes long you can mail me at my mail address.",
            time: "2022-08-31T08:19:23.830Z",
            senderId: 11
          }
        }
      },
      {
        id: 2,
        fullName: "Adalberto Granzin",
        role: "UI/UX Designer",
        about: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
        avatar: "/static/media/avatar-s-1.d383013d.jpg",
        status: "busy",
        chat: {
          id: 2,
          unseenMsgs: 1,
          lastMessage: {
            message: "I will purchase it for sure. 👍",
            time: "2022-09-01T08:19:23.830Z",
            senderId: 1
          }
        }
      },
      {
        id: 3,
        fullName: "Joaquina Weisenborn",
        role: "Town planner",
        about: "Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
        avatar: "/static/media/avatar-s-3.c1d416e5.jpg",
        status: "busy"
      },
      {
        id: 4,
        fullName: "Verla Morgano",
        role: "Data scientist",
        about: "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
        avatar: "/static/media/avatar-s-4.a649af23.jpg",
        status: "online"
      },
      {
        id: 5,
        fullName: "Margot Henschke",
        role: "Dietitian",
        about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
        avatar: "/static/media/avatar-s-5.301316d5.jpg",
        status: "busy"
      },
      {
        id: 6,
        fullName: "Sal Piggee",
        role: "Marketing executive",
        about: "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
        avatar: "/static/media/avatar-s-6.974f64da.jpg",
        status: "online"
      },
      {
        id: 7,
        fullName: "Miguel Guelff",
        role: "Special educational needs teacher",
        about: "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",
        avatar: "/static/media/avatar-s-7.ba3f6823.jpg",
        status: "online"
      },
      {
        id: 8,
        fullName: "Mauro Elenbaas",
        role: "Advertising copywriter",
        about: "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
        avatar: "/static/media/avatar-s-8.e9b18971.jpg",
        status: "away"
      },
      {
        id: 9,
        fullName: "Bridgett Omohundro",
        role: "Designer, television/film set",
        about: "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
        avatar: "/static/media/avatar-s-9.e2785e7a.jpg",
        status: "offline"
      },
      {
        id: 10,
        fullName: "Zenia Jacobs",
        role: "Building surveyor",
        about: "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
        avatar: "/static/media/avatar-s-10.79a4ca26.jpg",
        status: "away"
      }
    ],
    userProfile: {
      id: 11,
      avatar: "/static/media/avatar-s-1.d383013d.jpg",
      fullName: "John Doe",
      role: "admin",
      about: "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
      status: "online",
      settings: {
        isTwoStepAuthVerificationEnabled: true,
        isNotificationsOn: false
      }
    },
    selectedUser: {}
  }

  // ** States
  const [user, setUser] = useState({})
  const [sidebar, setSidebar] = useState(false)
  const [userSidebarRight, setUserSidebarRight] = useState(false)
  const [userSidebarLeft, setUserSidebarLeft] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})
  const [userProfile] = useState(store.userProfile)

  // ** Sidebar & overlay toggle functions
  const handleSidebar = () => setSidebar(!sidebar)
  const handleUserSidebarLeft = () => setUserSidebarLeft(!userSidebarLeft)
  const handleUserSidebarRight = () => setUserSidebarRight(!userSidebarRight)
  const handleOverlayClick = () => {
    setSidebar(false)
    setUserSidebarRight(false)
    setUserSidebarLeft(false)
  }

  // ** Set user function for Right Sidebar
  const handleUser = obj => setUser(obj)

  // ** Get data on Mount
  useEffect(() => {
    // console.log(selectedUser)
    // const cahtLogs = chats.find(item => item.userId === selectedUser.id)
    // selectedUser.chats = cahtLogs
    // dispatch(getChatContacts())
    // dispatch(getUserProfile())
  }, [selectedUser])

  const selectedUserChat = id => {
    // console.log(setSelectedUser)
    // console.log(id)
    // console.log(store.chats.find(item => item.id === id))
    const user = store.chats.find(item => item.id === id)
    const chatLogs = chats.find(item => item.userId === id)
    user.chat = chatLogs.chat
    setSelectedUser(user)
  }
  return (
    <Fragment>
      <Sidebar
          selectedUserChat={selectedUserChat}
        store={store}
        sidebar={sidebar}
        handleSidebar={handleSidebar}
        userSidebarLeft={userSidebarLeft}
        handleUserSidebarLeft={handleUserSidebarLeft}
      />
      <div className='content-right'>
        <div className='content-wrapper'>
          <div className='content-body'>
            <div
              className={classnames('body-content-overlay', {
                show: userSidebarRight === true || sidebar === true || userSidebarLeft === true
              })}
              onClick={handleOverlayClick}
            ></div>
            <Chat
                selectedUser={selectedUser}
                userProfile={userProfile}
              store={store}
              handleUser={handleUser}
              handleSidebar={handleSidebar}
              userSidebarLeft={userSidebarLeft}
              handleUserSidebarRight={handleUserSidebarRight}
            />
            <UserProfileSidebar
              user={user}
              userSidebarRight={userSidebarRight}
              handleUserSidebarRight={handleUserSidebarRight}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default AppChat
