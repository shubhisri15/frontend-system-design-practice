function myDebounce(func, delay) {
    let timer = null
    let context = undefined
    let fnArgs = undefined

    function invoke() {
        if(timer === null) return

        clearTimer()
        func.apply(context, fnArgs)
    }

    function clearTimer() {
        clearTimeout(timer)
        timer = null
    }

    function fn(...args) {
        clearTimer()
        context = this
        fnArgs = args
        setTimeout(() => invoke(), delay)
    }

    fn.cancel = clearTimer
    fn.flush = invoke

    return fn
}