import { useEffect } from "react"
import { useState } from "react"

export default function DigitalClock() {

    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const formattedTime = time.toLocaleTimeString([], {
        hour12: true
    })

    return (
        <div>
            Digital Clock
            <div>
                <p>{formattedTime}</p>
            </div>
        </div>
    )
}