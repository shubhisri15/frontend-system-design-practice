import { useState, useEffect, useRef } from "react"

export default function Counter() {
    const [count, setCount] = useState(0)
    const counterRef = useRef(null)

    useEffect(() => {
        return () => clearInterval(counterRef.current);
    }, []);

    const handleStart = () => {
        clearInterval(counterRef.current)
        counterRef.current = setInterval(() => {
            setCount(prev => prev + 1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(counterRef.current)
    }

    const handleReverse = () => {
        clearInterval(counterRef.current)
        counterRef.current = setInterval(() => {
            setCount(prev => {
                if (prev > 0) return prev - 1
                clearInterval(counterRef.current); // stop at 0
                return 0;
            })
        }, 1000)
    }

    return (
        <div className='counter'>
            <h1>Counter</h1>
            <div className='counter-display'>{count}</div>
            <div className='counter-btns'>
                <button onClick={() => handleStart()}>Start</button>
                <button onClick={() => handlePause()}>Pause</button>
                <button onClick={() => handleReverse()}>Reverse</button>
            </div>
        </div>
    )
}