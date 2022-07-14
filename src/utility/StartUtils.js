
export const refreshList = new Array()

export const addRefreshList = (name, func) => {
    if (!refreshList.filter(e => e.className === name).length > 0) refreshList.push({className: name, function: func})
}

export const refreshAll = async (name) => {
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

export const useStartDay = (name, func) => {
    addRefreshList(name, func)
    return {refresh: refreshAll}
}