function memoizeUsingLRUCache(func, capacity = 4) {
    let cache = new Map()

    return function(...args) {
        const key = JSON.stringify(args)

        if(cache.has(key)) {
            const value = cache.get(key)
            cache.delete(key)
            cache.set(key, value)
            return value
        }

        const value = func(...args) // or again, use func.apply(this, args) to preserve the this context if the function we memoize requires that 
        
        if (cache.size === capacity) {
            const lruKey = cache.keys().next().value
            cache.delete(lruKey)
        }

        cache.set(key, value)
        return value
    }
}

// const RESULT_KEY = Symbol('memoized_result')

// function memoizeWithLRUForObjectAsArgs(func, capacity = 4) {
//     let cache = new Map()

//     return function(...args) {
//         let currentMap = cache

//         for (let arg of args) {
//             if(!currentMap.has(arg)) {
//                 currentMap.set(arg, new Map())
//             }

//             currentMap = currentMap.get(arg)
//         }

//         if(currentMap.has)
//     }
// }