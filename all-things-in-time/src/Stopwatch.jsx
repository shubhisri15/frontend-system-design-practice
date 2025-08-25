import { useState, useRef, useEffect } from 'react'

export default function Stopwatch() {
    const [time, setTime] = useState(0)
    const stopWatchRef = useRef(null)

    useEffect(() => {
        return () => clearInterval(stopWatchRef.current)     
    }, [])
 
    const handleStart = () => {
        clearInterval(stopWatchRef.current)
        stopWatchRef.current = setInterval(() => {
            setTime(prev => prev + 1)
        }, 1000)
    }

    const handleStop = () => {
        clearInterval(stopWatchRef.current)
    }

    const handleReset = () => {
        clearInterval(stopWatchRef.current)
        setTime(0)
    }

    const formatTime = () => {
        const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
        const seconds = String(Math.floor(time % 60)).padStart(2, '0')
        const hours = String(Math.floor(time / 3600)).padStart(2, '0')

        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <div className='stopwatch'>
            <h1>Stopwatch</h1>
            <div className='counter-display'>
                {formatTime()}
            </div>
            <div className='counter-btns'>
                <button onClick={() => handleStart()}>Start</button>
                <button onClick={() => handleStop()}>Stop</button>
                <button onClick={() => handleReset()}>Reset</button>
            </div>
        </div>
    )
}