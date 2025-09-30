import { useState } from 'react'
import './App.css'
import { events as initialEvents } from './events'
import CalendarHeader from './components/CalendarHeader'
import CalendarGrid from './components/CalendarGrid'
import EventModal from './components/EventModal'

function App() {

  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState(initialEvents)

  const addNewEvent = () => {}
  const editEvent = () => {}
  const saveEvent = () => {}

  return (
    <main>
      <CalendarHeader />
      <CalendarGrid />
      {modalOpen && <EventModal />}
    </main>
    
  )
}

export default App
