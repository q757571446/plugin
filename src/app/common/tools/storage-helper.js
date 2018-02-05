const storage = weex.requireModule('storage')

const getItem = (key) => {
    return new Promise((resolve, reject) => {
        storage.getItem(key, event => {
            event.result == 'success' ? resolve(event.data) : reject(`cannot find ${key}!`)
        })
    })
}

const setItem = (key, value) => {
    return new Promise((resolve, reject) => {
        storage.setItem(key, value, event => {
            event.result == 'success' ? resolve(value) : reject(`save ${key}:${value} failure!`)
        })
    })
}

const removeItem = (key) => {
    return new Promise((resolve, reject) => {
        storage.removeItem(key, event => {
            event.result == 'success' ? resolve(`clear ${key} success`) : reject(`clear ${key} failure!`)
        })
    })
}

export default {
    getItem,
    setItem,
    removeItem
}