function myDebounce(func, delay) {
    let timer
    return function(...args) {
        if(timer) clearTimeout(timer)
        timer = setTimeout(() => func(...args), delay)
    }
}

function myDebounceReturnsPromise(func, delay) {
    let timer
    return function (...args) {
        return new Promise(resolve => {
            timer = setTimeout(() => resolve(func(...args)), delay)
        })
    }
}

function myDebounceGetsCalledOnFirstCall(func, delay, immediate = false) {
    let timer
    return function(...args) {
        let callNow = immediate && !timer
        
        if(timer) clearTimeout(timer)

        timer = setTimeout(() => {
            timer = null // next call can be immediate (after the delay passes)
            if (!immediate) func(...args) // if immediate false, we want to call function after the delay
        }, delay)

        if (callNow) func(...args) // if immediate true and first call, call function
    }
}

function search(query) {
    console.log(query)
}

const debouncedSearch = myDebounce(search, 100)

debouncedSearch('s')
debouncedSearch('shu')
debouncedSearch('shub')
debouncedSearch('shubhi')
