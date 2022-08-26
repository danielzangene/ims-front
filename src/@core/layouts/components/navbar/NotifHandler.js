import React, {Fragment, useEffect} from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import {getUserData} from '@utils'
import Avatar from '@components/avatar'
import {toast} from "react-toastify"
import {FileText} from 'react-feather'

import netConfig from '@configs/netConfig'

let stompClient = null

const NotifHandler = () => {

    const onPrivateMessage = (payload) => {
        console.log(JSON.parse(payload.body).description)
        console.log(JSON.parse(payload.body).userName)
        console.log(JSON.parse(payload.body).type.name)
        console.log(JSON.parse(payload.body).type.code)
        const pos = window.innerWidth > 1024 ? 'bottom-right' : 'bottom-center'
        toast.error(<InfoToast payload={payload} />, { position: pos, icon: false, autoClose: 5000, hideProgressBar: true })
    }
    const onConnected = async () => {
        await stompClient.subscribe(`/user/${getUserData().username}/notif`, onPrivateMessage)
    }

    const onError = (err) => {
        console.log(err)
    }

    const connect = () => {
        console.log(netConfig.baseUrl)
        const socketUrl = `${netConfig.baseUrl}/api/ws`
        const Sock = new SockJS(socketUrl)
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError)
    }

    const InfoToast = ({payload}) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='info' icon={<FileText size={12}/>}/>
                    <h6 className='text-info ms-50 mb-0'>{JSON.parse(payload.body).userName}</h6>
                </div>
                <small className='text-muted'>{JSON.parse(payload.body).type.name}</small>
            </div>
            <div className='toastify-body'>
                <span>{JSON.parse(payload.body).description}</span>
            </div>
        </Fragment>
    )
    useEffect(() => {
        connect()
    }, [])

    return (
        <div></div>
    )
}
export default NotifHandler
