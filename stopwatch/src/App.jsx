import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [time, setTime] = useState(0) // time in seconds
  const [timerRunning, setTimerRunning] = useState(0)
  const timer = useRef(null)
  
  useEffect(() => {
    if (timerRunning) {
      timer.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [timerRunning])

  const startTimer = () => setTimerRunning(true)
  const stopTimer = () => setTimerRunning(false)
  const resetTimer = () => {
    setTimerRunning(false)
    setTime(0)
  }

  const timeDisplay = () => {
    const minutesString = String(Math.floor((time % 3600) / 60)).padStart(2, '0')
    const hoursString = String(Math.floor(time / 3600)).padStart(2, '0')
    const secondsString = String(time % 60).padStart(2, '0')

    return `${hoursString} : ${minutesString} : ${secondsString}`
  }
  
  return (
    <main>
      <h1>Shubhi's Stopwatch</h1>
      <div>{timeDisplay()}</div>
      <div className='buttons-container'>
          <button onClick={startTimer}>Start</button>
          <button onClick={stopTimer}>Stop</button>
          <button onClick={resetTimer}>Reset</button>
      </div>
    </main>
  )
}

export default App
