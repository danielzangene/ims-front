import {Fragment, useEffect, useState} from 'react'
import {
    Button,
    Col,
    DropdownToggle,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    Badge,
    UncontrolledDropdown
} from 'reactstrap'
import Avatar from '@components/avatar'

import classnames from 'classnames'
import {Check, LogOut, User, X} from 'react-feather'
import {useHistory} from "react-router-dom"
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import {getUserData, isUserLoggedIn, logoutHandler} from '@utils'

const NotificationSidebar = () => {

    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState(null)
    const history = useHistory()
    const userAvatar = (userData && userData.avatar) || defaultAvatar

    useEffect(() => {
        if (isUserLoggedIn()) {
            setUserData(getUserData())
        } else {
            history.push("/login")
        }
    }, [])

    const logout = () => {
        logoutHandler()
    }

    const linkProfile = () => {
        history.push("/profile")
        setShow(false)
    }

    const showCanvas = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const notificationsArray = [
        {
            img: null, //require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
            subtitle: 'Won the monthly best seller badge.',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>Congratulation Sam 🎉</span>winner!
                </p>
            )
        },
        {
            img: null, //require('@src/assets/images/portrait/small/avatar-s-15.jpg').default,
            subtitle: 'You have 10 unread messages.',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>New message</span>&nbsp;received
                </p>
            )
        },
        {
            avatarContent: 'MD',
            color: 'light-danger',
            subtitle: 'MD Inc. order updated',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>Revised Order 👋</span>&nbsp;checkout
                </p>
            )
        },
        {
            avatarIcon: <X size={14}/>,
            color: 'light-danger',
            subtitle: 'USA Server is down due to hight CPU usage',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>Server down</span>&nbsp;registered
                </p>
            )
        },
        {
            avatarIcon: <Check size={14}/>,
            color: 'light-success',
            subtitle: 'Last month sales report generated',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>Sales report</span>&nbsp;generated
                </p>
            )
        },
        {
            avatarIcon: "!",
            color: 'light-warning',
            subtitle: 'BLR Server using high memory',
            title: (
                <p className='media-heading'>
                    <span className='fw-bolder'>High memory</span>&nbsp;usage
                </p>
            )
        }
    ]

    // ** Function to render Notifications
    /*eslint-disable */
    const renderNotificationItems = () => {
        return notificationsArray.map((item, index) => {
                return (
                    <div key={index}>
                        <a className='d-flex' href='/' onClick={e => e.preventDefault()}>
                            <div
                                className={classnames('list-item d-flex', {
                                    'align-items-start': !item.switch,
                                    'align-items-center': item.switch
                                })}
                            >
                                {!item.switch ? (
                                    <Fragment>
                                        <div className='me-1'>
                                            <Avatar
                                                {...(item.img
                                                    ? {img: item.img, imgHeight: 32, imgWidth: 32}
                                                    : item.avatarContent
                                                        ? {
                                                            content: item.avatarContent,
                                                            color: item.color
                                                        }
                                                        : item.avatarIcon
                                                            ? {
                                                                icon: item.avatarIcon,
                                                                color: item.color
                                                            }
                                                            : null)}
                                            />
                                        </div>
                                        <div className='list-item-body flex-grow-1'>
                                            {item.title}
                                            <small className='notification-text'>{item.subtitle}</small>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {item.title}
                                        {item.switch}
                                    </Fragment>
                                )}
                            </div>
                        </a>
                        <a key={index} className='d-flex' href='/' onClick={e => e.preventDefault()}>
                            <div
                                className={classnames('list-item d-flex', {
                                    'align-items-start': !item.switch,
                                    'align-items-center': item.switch
                                })}
                            >
                                {!item.switch ? (
                                    <Fragment>
                                        <div className='me-1'>
                                            <Avatar
                                                {...(item.img
                                                    ? {img: item.img, imgHeight: 32, imgWidth: 32}
                                                    : item.avatarContent
                                                        ? {
                                                            content: item.avatarContent,
                                                            color: item.color
                                                        }
                                                        : item.avatarIcon
                                                            ? {
                                                                icon: item.avatarIcon,
                                                                color: item.color
                                                            }
                                                            : null)}
                                            />
                                        </div>
                                        <div className='list-item-body flex-grow-1'>
                                            {item.title}
                                            <small className='notification-text'>{item.subtitle}</small>
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {item.title}
                                        {item.switch}
                                    </Fragment>
                                )}
                            </div>
                        </a>
                    </div>
                )
            }
        )
    }
    /*eslint-enable */

    return (
        <div>
            <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
                <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => showCanvas(e)}>
                    <div className='user-nav d-sm-flex d-none'>
                        <span className='user-name fw-bold'>{(userData && userData.name) || 'John Doe'}</span>
                        <span className='user-status text-muted'>{(userData && userData.role) || 'Admin'}</span>
                    </div>
                    <Avatar img={userAvatar} imgHeight='40' imgWidth='40'/>{/*status='online'*/}
                    <Badge pill color='danger' className='badge-up'>5</Badge>
                </DropdownToggle>

            </UncontrolledDropdown>
            <Offcanvas
                scrollable={true}
                // backdrop={canvasBackdrop}
                direction='end'
                isOpen={show}
                toggle={() => setShow(!show)}
            >
                <OffcanvasHeader className='mt-1' toggle={() => setShow(!show)}>پیام ها
                    <hr/>
                </OffcanvasHeader>
                {notificationsArray.length !== 0 &&
                    <OffcanvasBody className=''>
                        <Row className='px-0 mx-0'>
                            <Col className='px-0 mx-0'>
                                {renderNotificationItems()}
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center'>
                                <Button className='round mt-3  opacity-50 btn-icon rounded-circle' color='danger'>
                                    <X/>
                                </Button>
                            </Col>
                        </Row>
                    </OffcanvasBody>
                }
                <OffcanvasHeader className=''>
                        <Button className='text-white' color='flat-primary' outline onClick={linkProfile}>
                            <Avatar color='light-primary' icon={<User size={20}/>} className='my-1 me-1'/>
                            پروفایل
                        </Button>
                        <Button className='text-white' color='flat-danger' outline onClick={logout}>
                            <Avatar color='light-danger' icon={<LogOut size={20}/>} className='m-1'/>
                            خروج
                        </Button>
                </OffcanvasHeader>
            </Offcanvas>
        </div>
    )
}

export default NotificationSidebar
