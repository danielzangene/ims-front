// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: 'سامانه مدیریتی',
    appLogoImage: require('@src/assets/images/logo/logo.png').default
  },
  layout: {
    isRTL: true,
    skin: 'bordered', // light, dark, bordered, semi-dark
    routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
    type: 'vertical', // vertical, horizontal
    animation: 'fadeIn', // fadeInLeft, zoomIn , fadeIn, none
    contentWidth: 'full', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'hidden' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: true // Enable scroll to top button
  }
}

export default themeConfig
