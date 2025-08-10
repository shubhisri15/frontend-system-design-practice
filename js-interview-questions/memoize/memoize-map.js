function memoizeSingleArg(func) {
    const cache = new Map()

    return function(arg) {
        if(cache.has(arg)) {
            return cache.get(arg)
        }

        let result = func(arg)
        cache.set(arg, result)
        return result
    }
}

function memoizeMultipleArgs(func) {
    const cache = new Map()

    return function(...args) {
        let key = JSON.stringify(args) // good when args are primitive, and when the order of the args matters

        if(cache.has(key)) {
            return cache.get(key)
        }

        let result = func(...args) // good for when the function we are memoizing does not depend on "this" to perform computation
        cache.set(key, result)
        return result
    }
}

// We use a nested maps approach when we have complex args (large objects etc), and when we want to memoize functions that depend on "this"
// This will still break if order of args is changed. To preserve values for all orders, we need to normalise the args

const RESULT_KEY = Symbol("memoize_result"); // unique key

function memoizeObjectsAsArgs(func) {
    const mainCache = new Map()

    return function(...args) {
        let currentMap = mainCache

        for (let arg of args) {
            if(!currentMap.has(arg)) {
                currentMap.set(arg, new Map())
            }

            currentMap = currentMap.get(arg)
        }

        if (currentMap.has(RESULT_KEY)) {
            return currentMap.get(RESULT_KEY);
        }

        const result = func.apply(this, args) // this ensures that if the function depends on "this" context, the context is not lost
        currentMap.set(RESULT_KEY, result)

        return result
    }
}