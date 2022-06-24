import netConfig from '@configs/netConfig'
import { useState, useEffect } from 'react'
import { logoutHandler } from '@utils'
import { useHistory } from "react-router-dom"

const useFetch = (uri, requestMethod, requestBody) => {
    const [data, setData] = useState(null)
    const history = useHistory()

    useEffect(() => {
        const initRequest = {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken")
            },
            method: requestMethod
        }
        if (requestMethod !== netConfig.getMethod) initRequest["body"] = JSON.stringify(requestBody)
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
                    console.log(data)
                })
        }, 1000)
        return () => abortCont.abort()
    }, [uri])

    return { data }
}

export default useFetch
