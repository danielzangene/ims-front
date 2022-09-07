import netConfig from '@configs/netConfig'

import {getAccessToken, logoutHandler} from '@utils'

const UseFetchUrl = async (uri, requestMethod, requestBody) => {

    const initRequest = {
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessToken()
        },
        method: requestMethod,
        body: JSON.stringify(requestBody)
    }
    try {
        const data = await fetch(netConfig.baseUrl + uri, initRequest)
            .then(res => {
                if (res.ok) return res.json()
                if (res.status === netConfig.unauthorizedStatus) return res.json()
                throw new Error('can not connect')
            }).then(res => {
                // console.log(res)
                return res
            }).catch((error) => {
                console.log(error)
                return {code: 500, message: 'خطا در فراخوانی سرویس، خواهشمندیم دوباره تلاش کنید.'}
            })

        if (data.code === netConfig.unauthorizedStatus) logoutHandler(data.message)

        return data
    } catch (err) {
        console.log(err)
    }
}

export default UseFetchUrl
