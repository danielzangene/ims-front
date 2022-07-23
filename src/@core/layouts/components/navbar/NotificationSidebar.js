import {Fragment, useState} from 'react'
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

import classnames from 'classnames'
import {AlertTriangle, Bell, Check, X} from 'react-feather'

const NotificationSidebar = () => {
    const [show, setShow] = useState(false)
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
            avatarIcon: <AlertTriangle size={14}/>,
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
                )
            }
        )
    }
    /*eslint-enable */

    return (
        <div className='pe-1'>
            <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-10'>
                <DropdownToggle caret tag='a' className='nav-link' href='/' onClick={e => showCanvas(e)}>
                    <Bell size={24}/>
                    <Badge pill color='danger' className='badge-up'>
                        5
                    </Badge>
                </DropdownToggle>

            </UncontrolledDropdown>
            <Offcanvas
                scrollable={true}
                // backdrop={canvasBackdrop}
                direction='end'
                isOpen={show}
                toggle={() => setShow(!show)}
            >
                <OffcanvasHeader className='mt-1' toggle={() => setShow(!show)}>پیام ها </OffcanvasHeader>
                {notificationsArray.length !== 0 &&
                    <OffcanvasBody className=''>
                        <hr/>
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
            </Offcanvas>
        </div>
    )
}

export default NotificationSidebar
