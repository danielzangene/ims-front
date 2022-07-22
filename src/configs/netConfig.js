// You can customize the template with the help of this file

//Template config options
const netConfig = {
    baseUrl: "http://192.168.43.61:8080",
    okStatus: 200,
    unauthorizedStatus: 401,
    getMethod: "GET",
    postMethod: "POST",
    putMethod: "PUT",
    deleteMethod: "DELETE",
    app: {
        appName: 'سامانه مدیریتی',
        appLogoImage: require('@src/assets/images/logo/logo.png').default
    }
}

export default netConfig