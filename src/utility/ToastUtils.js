import {toast} from "react-toastify"

export const showErrorToast = (message) => {
    const pos = window.innerWidth > 1024 ? 'bottom-right' : 'bottom-center'
    toast.error(message, {
        position: pos,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
    })
}

export const showSuccessToast = (message) => {
    const pos = window.innerWidth > 1024 ? 'bottom-right' : 'bottom-center'
    toast.success(message, {
        position: pos,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
    })
}