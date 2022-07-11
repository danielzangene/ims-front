import netConfig from '@configs/netConfig'
import {useEffect, useState} from 'react'
import {getAccessToken, logoutHandler} from '@utils'

const useFetch = (uri, requestMethod, requestBody) => {
    const [data, setData] = useState(null)

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
                        logoutHandler(data.message)
                    } else {
                        setData(data)
                    }
                })
        }, 3000)
        return () => abortCont.abort()
    }, [uri])

    return {data}
}

export default useFetch
