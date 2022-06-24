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
    const data = await fetch(netConfig.baseUrl + uri, initRequest)
        .then(res => {
            return res.json()
        }).then(res => {
            return res
        })

    if (data.code === netConfig.unauthorizedStatus) logoutHandler()

    return data
}

export default UseFetchUrl
