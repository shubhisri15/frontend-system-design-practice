function throttle(func, delay) {
    let lastCall = 0
    let timer 
    let lastArgs
    return function(...args) {
        let now = Date.now()
        lastArgs = args
        if (now - lastCall >= delay) {
            lastCall = now
            func(...args)
        } else {
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                lastCall = Date.now()
                func(...lastArgs)
            }, delay - (now - lastCall))
        }
    }
}

function myThrottledApi(something) {
    console.log(something)
}

const throttledCall = throttle(myThrottledApi, 100)

setInterval(() => throttledCall('hi'), 150)
