import netConfig from '@configs/netConfig'

import { logoutHandler } from '@utils'

const UseFetchUrl = async (uri, requestMethod, requestBody) => {

    const initRequest = {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken")
        },
        method: requestMethod
    }

    if (requestMethod !== netConfig.getMethod) initRequest["body"] = JSON.stringify(requestBody)

    let data = await fetch(netConfig.baseUrl + uri, initRequest)
        .catch(err => {
            console.log(err)
        })
    data = await data.json()
        .catch(err => {
            console.log(err)
        })
    if (data.code === netConfig.unauthorizedStatus) logoutHandler()

    return data
}

export default UseFetchUrl
