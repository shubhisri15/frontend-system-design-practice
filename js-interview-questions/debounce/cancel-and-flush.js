function myDebounceTwo(func, delay) {
    let timer
    let latestArgs

    function debounced(...args) {
        latestArgs = args
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => func(...args), delay)
    }

    debounced.flush = () => {
        if (!latestArgs) return
        clearTimeout(timer)
        timer = null
        func(...latestArgs)
    }

    debounced.cancel = () => {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}