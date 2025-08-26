import { useRef, useEffect, useCallback } from 'react'

export default function useDebounce(fn, delay) {
    const timerRef = useRef(null)

    const debouncedFn = useCallback((...args) => {
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => fn(...args), delay)
    }, [fn, delay])

    useEffect(() => {
        return () => clearTimeout(timerRef.current)
    })

    return debouncedFn
}

// let timer
// return function(...args) {
    // if timer, clearTimeout
    // timer = setTimeout(fn(...args), delay)   
// }
