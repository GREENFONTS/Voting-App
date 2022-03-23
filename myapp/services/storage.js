module.exports = {
    getStorage : (key) => {
        if(typeof window !== 'undefined'){
           return JSON.parse(window.localstorage.getItem(key))
       }
    },

    setStorage : (key, value) => {
        if(typeof window !== 'undefined'){
            window.localstorage.setItem(key, JSON.stringify(value))
        }
    }
}