import {Fragment, useEffect, useState} from 'react'
import {
    Badge,
    Button,
    Col,
    DropdownToggle,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    Row,
    UncontrolledDropdown
} from 'reactstrap'
import Avatar from '@components/avatar'

import {LogOut, User, X} from 'react-feather'
import {useHistory} from "react-router-dom"
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import {getUserData, isUserLoggedIn, logoutHandler} from '@utils'
import useFetchUrl from "../../../../utility/UseFetchUrl"

const NotificationSidebar = () => {

    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState(null)
    const [data, setData] = useState(null)
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

    const statusClass = {
        LEAVE_REQUEST_LOG_TYPE_2: 'bg-light-danger',
        FOOT_WORK_LOG_TYPE: 'bg-light-success',
        LEAVE_REQUEST_LOG_TYPE: 'bg-light-warning'
    }

    const showCanvas = (e) => {
        e.preventDefault()
        setShow(true)
    }
    /*eslint-enable */
    const renderNotificationItems = () => {
        return data.resultData.requests.map((item, index) => {
                return (
                    <div key={index}>
                        <a className='d-flex' href='/' onClick={e => e.preventDefault()}>
                            <div className='list-item d-flex align-items-start'>
                                <Fragment>
                                    <div className='me-1'>
                                        <Avatar
                                            {...{
                                                content: item.userName.split(" ").map(function (value) {
                                                    return value[0]
                                                }).join(""),
                                                color: item.color
                                            }}
                                        />
                                    </div>
                                    <div className='list-item-body  flex-grow-1'>
                                        <span className='fw-bolder'>{item.userName}</span>
                                        <Badge pill
                                               className={`${statusClass[item.type.code]} ms-1`}>{item.type.name}</Badge>
                                        <p className='notification-text'>
                                            {item.description && item.description.substring(0, 60)}
                                            {item.description && item.description.length > 60 && `...`}
                                        </p>
                                    </div>
                                </Fragment>
                            </div>
                        </a>
                    </div>
                )
            }
        )
    }
    /*eslint-enable */

    const refresh = async () => {
        const d = await useFetchUrl("/api/v1/personnel/request/all/summary", "PATCH", null)
        console.log(d)
        setData(d)
    }

    useEffect(async () => {
        await refresh()
    }, [])


    return (
        <div>
            <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
                <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => showCanvas(e)}>
                    <div className='user-nav d-sm-flex d-none'>
                        <span className='user-name fw-bold'>{(userData && userData.name) || 'John Doe'}</span>
                        <span className='user-status text-muted'>{(userData && userData.role) || 'Admin'}</span>
                    </div>
                    <Avatar img={userAvatar} imgHeight='40' imgWidth='40'/>{/*status='online'*/}
                    {data && data.resultData && data.resultData.count !== 0 &&
                        <Badge pill color='danger' className='badge-up'>
                            {data.resultData.count}
                        </Badge>
                    }
                </DropdownToggle>

            </UncontrolledDropdown>
            <Offcanvas
                scrollable={true}
                direction='end'
                isOpen={show}
                toggle={() => setShow(!show)}
            >
                <OffcanvasHeader className='mt-1' toggle={() => setShow(!show)}>پیام ها
                    <hr/>
                </OffcanvasHeader>
                <OffcanvasBody className='canvas-notification'>
                    {data && data.resultData && data.resultData.requests && data.resultData.requests.length !== 0 &&
                        <div>
                            <Row className='px-0 mx-0'>
                                <Col className='px-0 mx-0'>
                                    {data && data.resultData && data.resultData.requests && renderNotificationItems()}
                                </Col>
                            </Row>
                            <Row>
                                <Col className='text-center'>
                                    <Button className='round mt-3  opacity-50 btn-icon rounded-circle'
                                            onClick={() => setData(null)}
                                            color='danger'>
                                        <X/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    }
                </OffcanvasBody>
                <OffcanvasHeader className=''>
                    <Button color='flat-dark' outline onClick={linkProfile} className='text-body'>
                        <Avatar color='light-primary' icon={<User size={20}/>} className='my-1 me-1'/>
                        <span> پروفایل</span>
                    </Button>
                    <Button color='flat-danger' outline onClick={logout} className='text-body'>
                        <Avatar color='light-danger' icon={<LogOut size={20}/>} className='m-1'/>
                        <span>خروج</span>
                    </Button>
                </OffcanvasHeader>
            </Offcanvas>
        </div>
    )
}

export default NotificationSidebar
