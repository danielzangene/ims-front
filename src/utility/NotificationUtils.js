// notificationUtils

let refreshList = new Array()

const addRefreshList = (name, func) => {
    if (refreshList.filter(e => e.className === name).length > 0) {
        refreshList = refreshList.filter(e => e.className !== name)
    }
    refreshList.push({className: name, function: func})
}

const refreshAll = async (name) => {
    for (const item of refreshList) {
        if (item.className !== name) {
            try {
                await item.function()
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export const useNotification = (name, func) => {
    addRefreshList(name, func)
    return {refresh: refreshAll}
}