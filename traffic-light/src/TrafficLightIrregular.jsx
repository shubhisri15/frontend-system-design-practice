import { useState, useEffect } from 'react'
import './App.css'

export default function TrafficLightIrregular() {
    const [lightColor, setLightColor] = useState('red')

    useEffect(() => {
        let timer;
        let colors = ['red', 'yellow', 'green']
        let intervals = [4000, 300, 200]
        let current = 0

        function changeColor() {
        setLightColor(colors[current])
        timer = setTimeout(() => {
            current = (current + 1) % colors.length
            changeColor()
        }, intervals[current])
        }

        changeColor()

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='light-container'>
            <h1 style={{ color: 'white'}}>Lights at irregular intervals</h1>
            <div className={`light ${lightColor === 'red' ? 'red' : ''}`}></div>
            <div className={`light ${lightColor === 'yellow' ? 'yellow' : ''}`}></div>
            <div className={`light ${lightColor === 'green' ? 'green' : ''}`}></div>
        </div>
    )
}