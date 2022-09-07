import {useEffect, useState} from 'react'
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
import {Check, LogOut, Menu, User, X} from 'react-feather'
import Avatar from '@components/avatar'
import {useHistory} from "react-router-dom"
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-1.jpg'
import {getUserData, isUserLoggedIn, logoutHandler} from '@utils'
import useFetchUrl from "../../../../utility/UseFetchUrl"
import {useNotification} from "@notificationUtils"
import netConfig from '@configs/netConfig'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import 'animate.css/animate.css'
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss'
import {showErrorToast, showSuccessToast} from "../../../../utility/ToastUtils"


const NotificationSidebar = () => {

    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState(null)
    const [data, setData] = useState(null)
    const history = useHistory()
    const userAvatar = (userData && userData.avatar) || defaultAvatar

    const MySwal = withReactContent(Swal)

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

    const refresh = async () => {
        const d = await useFetchUrl("/api/v1/personnel/request/all/summary", "PATCH", null)
        setData(d)
    }

    const useNotif = useNotification('NotificationSidebar', refresh)

    useEffect(async () => {
        await refresh()
    }, [])

    const acceptRequest = async (logId) => {
        const res = await useFetchUrl("/api/v1/personnel/request/accept", "POST", {id: logId})
        if (res.code === netConfig.okStatus) {
            await refresh()
            showSuccessToast(res.message)
            useNotif.refresh('NotificationSidebar')
        } else {
            showErrorToast(res.message)
        }
    }

    const acceptAll = async () => {
        data.resultData.requests.forEach(async (item) => {
            await useFetchUrl("/api/v1/personnel/request/accept", "POST", {id: item.id})
        })
        useNotif.refresh('')
    }

    const rejectAll = async () => {
        data.resultData.requests.forEach(async (item) => {
            await useFetchUrl("/api/v1/personnel/request/reject", "POST", {id: item.id})
        })
        useNotif.refresh('')
    }

    const rejectRequest = async (logId) => {
        const res = await useFetchUrl("/api/v1/personnel/request/reject", "POST", {id: logId})
        if (res.code === netConfig.okStatus) {
            await refresh()
            showSuccessToast(res.message)
            useNotif.refresh('NotificationSidebar')
        } else {
            showErrorToast(res.message)
        }
    }

    const showRequest = async (e, item) => {
        e.preventDefault()
        return MySwal.fire({
            title: item.userName,
            text: item.description,
            html: (
                <div>
                    <Badge pill className={`${statusClass[item.type.code]}  mb-1`}>
                        {item.type.name}
                    </Badge>
                    <p>{item.description}</p>
                </div>
            ),
            // 'You can use <b>bold text</b>, ' +
            // '<a href="//sweetalert2.github.io">links</a> ' +
            // 'and other HTML tags',
            showCancelButton: true,
            confirmButtonText: <Check/>,
            cancelButtonText: <X/>,
            customClass: {
                confirmButton: 'btn-icon round rounded-circle waves-effect btn  btn btn-flat-success',
                cancelButton: 'btn-icon round rounded-circle waves-effect btn btn-outline-danger btn btn-flat-danger ms-1 '
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.isDismissed) {
                if (result.dismiss === 'cancel') {
                    rejectRequest(item.id)
                }
            } else if (result.isConfirmed) {
                acceptRequest(item.id)
            }
        })
    }

    /*eslint-enable */
    const renderNotificationItems = () => {
        return data.resultData.requests.map((item, index) => {
                return (
                    <div key={index} className='border-bottom mb-1'>
                        <a className='d-flex' href='/' onClick={e => showRequest(e, item)}>
                            <div className='list-item d-flex align-items-start'>
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
                        <span className='user-status text-muted'>{(userData && userData.role) || ''}</span>
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
                                <Col className='text-center mt-2'>
                                    <Button color='flat-success' title='تایید همه درخواست ها'
                                            className='btn-icon round rounded-circle waves-effect btn btn-outline-success'
                                            onClick={() => {
                                                acceptAll()
                                            }}>
                                        <Check/>
                                    </Button>
                                    <Button color='flat-danger' title='رد همه درخواست ها'
                                            className='ms-1 btn-icon round rounded-circle waves-effect btn btn-outline-danger'
                                            onClick={() => {
                                                rejectAll()
                                            }}>
                                        <X/>
                                    </Button>
                                    <Button color='flat-secondary' title='پاک کردن همه درخواست ها'
                                            className='ms-1 btn-icon round rounded-circle waves-effect btn btn-outline-secondary'
                                            onClick={() => {
                                                setData(null)
                                            }}>
                                        <Menu/>
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
