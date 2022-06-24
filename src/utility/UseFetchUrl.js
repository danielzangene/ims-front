import netConfig from '@configs/netConfig'

import { logoutHandler, getAccessToken } from '@utils'

const UseFetchUrl = async (uri, requestMethod, requestBody) => {

    const initRequest = {
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessToken()
        },
        method: requestMethod,
        body: JSON.stringify(requestBody)
    }

    let data = await fetch(netConfig.baseUrl + uri, initRequest)
    data = await data.json()
    if (data.code === netConfig.unauthorizedStatus) logoutHandler()

    return data
}

export default UseFetchUrl
