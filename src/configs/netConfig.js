// You can customize the template with the help of this file

//Template config options
const netConfig = {
    baseUrl: "http://localhost:8080",
    okStatus: 200,
    unauthorizedStatus: 401,
    getMethod: "GET",
    postMethod: "POST",
    putMethod: "PUT",
    deleteMethod: "DELETE",
    app: {
        appName: 'شهرداری',
        appLogoImage: require('@src/assets/images/logo/logo.png').default
    }
}

export default netConfig