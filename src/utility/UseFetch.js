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
                    if (res.ok) return res.json()
                    throw new Error('can not connect')
                })
                .then(data => {
                    if (data.code === netConfig.unauthorizedStatus) {
                        logoutHandler(data.message)
                    } else {
                        setData(data)
                    }
                }).catch((error) => {
                console.log(error)
                return {code: 500, message:'خطا در فراخوانی سرویس، خواهشمندیم دوباره تلاش کنید.'}
            })
        }, 3000)
        return () => abortCont.abort()
    }, [uri])

    return {data}
}

export default useFetch
