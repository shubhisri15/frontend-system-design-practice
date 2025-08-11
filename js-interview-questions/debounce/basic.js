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

function search(query) {
    console.log(query)
}

const debouncedSearch = myDebounce(search, 100)

debouncedSearch('s')
debouncedSearch('shu')
debouncedSearch('shub')
debouncedSearch('shubhi')