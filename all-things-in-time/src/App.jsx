import { useState } from 'react'
import './App.css'
import Counter from './Counter'
import Timer from './Timer'
import Stopwatch from './Stopwatch'
import DigitalClock from './DigitalClock'

function App() {

  return (
    <main>
      <Counter />
      <Timer />
      <Stopwatch />
      <DigitalClock />
    </main>
  )
}

export default App
