import netConfig from '@configs/netConfig'
import { useState, useEffect } from 'react'
import { logoutHandler, getAccessToken } from '@utils'
import { useHistory } from "react-router-dom"

const useFetch = (uri, requestMethod, requestBody) => {
    const [data, setData] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const abortCont = new AbortController()
        const initRequest = {
            headers: {
                "Content-Type": "application/json",
                Authorization: getAccessToken()
            },
            method: requestMethod,
            body: JSON.stringify(requestBody),
            signal: abortCont.signal
        }
        setTimeout(() => {
            fetch(netConfig.baseUrl + uri, initRequest)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if (data.code === netConfig.unauthorizedStatus) {
                        logoutHandler()
                        history.push('/login')
                        setData(data)
                    } else {
                        setData(data)
                    }
                })
        }, 3000)
        return () => abortCont.abort()
    }, [uri])

    return { data }
}

export default useFetch
