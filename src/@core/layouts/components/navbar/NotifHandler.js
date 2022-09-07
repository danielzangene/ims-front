import React, {Fragment, useEffect} from 'react'
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import {getAccessToken, getUserData} from '@utils'
import Avatar from '@components/avatar'
import {toast} from "react-toastify"
import {FileText} from 'react-feather'
import {useNotification} from "@notificationUtils"

import netConfig from '@configs/netConfig'

let stompClient = null

const NotifHandler = () => {

    const refresh = () => {}

    const useNotif = useNotification('NotifHandler', refresh)

    const onPrivateMessage = (payload) => {
        toast.info(<InfoToast payload={payload} />, { position: "bottom-right", icon: false, autoClose: 5000, hideProgressBar: true })
        useNotif.refresh('')
    }

    const onConnected = async () => {
        await stompClient.subscribe(`/user/${getUserData().username}/notif`, onPrivateMessage)
    }

    const onError = (err) => {
        console.log(err)
    }

    const connect = () => {
        try {
            const socketUrl = `${netConfig.baseUrl}/api/ws?Authorization=${getAccessToken()}`
            const Sock = new SockJS(socketUrl)
            stompClient = over(Sock)
            stompClient.connect({}, onConnected, onError)
        } catch (err) {
            console.log(err)
        }
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
