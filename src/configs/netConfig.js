// You can customize the template with the help of this file

//Template config options
const netConfig = {//http://37.32.29.248:3000/
    baseUrl: "http://37.32.29.248:8080",
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