function throttle(func, delay) {
    let lastCall = 0
    return function(...args) {
        let now = Date.now()
        if (now - lastCall >= delay) {
            lastCall = now
            func(...args)
        }
    }
}

function myThrottledApi(something) {
    console.log(something)
}

const throttledCall = throttle(myThrottledApi, 100)

setInterval(() => throttledCall('hi'), 150)
