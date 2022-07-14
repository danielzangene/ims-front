import {toast} from "react-toastify"

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
        progress: undefined
    })
}

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        pauseOnHover: true,
        draggable: false,
        progress: undefined
    })
}