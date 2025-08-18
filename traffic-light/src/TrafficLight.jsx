import { useState, useEffect } from 'react'
import './App.css'

export default function TrafficLight() {
    const [lightColor, setLightColor] = useState('red')

    useEffect(() => {
        let timer;
        let colors = ['red', 'yellow', 'green']
        let current = 0

        timer = setInterval(() => {
            setLightColor(colors[current])
            current = (current + 1) % colors.length
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className='light-container'>
            <h1 style={{ color: 'white'}}>Lights at regular intervals</h1>
            <div className={`light ${lightColor === 'red' ? 'red' : ''}`}></div>
            <div className={`light ${lightColor === 'yellow' ? 'yellow' : ''}`}></div>
            <div className={`light ${lightColor === 'green' ? 'green' : ''}`}></div>
        </div>
    )
}