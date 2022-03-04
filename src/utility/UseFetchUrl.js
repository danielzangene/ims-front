import {useEffect} from 'react'
import {useHistory} from "react-router-dom"

import netConfig from '@configs/netConfig'

const UseFetchUrl = ({uri, requestMethod, requestBody, callBackFunction}) => {
    console.log(callBackFunction)
    console.log(requestBody)
    const history = useHistory()
    useEffect(() => {
        const abortCont = new AbortController()
        const initRequest = {
            signal: abortCont.signal,
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken")
            },
            method: requestMethod
        }
        if (requestMethod !== netConfig.getMethod) {
            initRequest["body"] = JSON.stringify(requestBody)
        }
        console.log(initRequest)

        fetch(netConfig.baseUrl + uri, initRequest)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.status === netConfig.unauthorizedStatus) {
                    history.push("/login")
                } else if (callBackFunction) {
                    callBackFunction(data, null)
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else if (callBackFunction) {
                    callBackFunction(null, err.message)
                }
            })
        return () => abortCont.abort()
    }, [uri])
    return (<div></div>)
}

export default UseFetchUrl