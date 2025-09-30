import React, { useState, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import EventModal from "./components/EventModal";
import { getStartOfWeek, addDaysToDate, addHours } from "./utils/dateUtils";

// Initial events you provided
const initialEvents = [
  { title: "My Task 1", type: "TASK", start: 1745901600000, end: 1745905200000 },
  { title: "My Task 2", type: "TASK", start: 1745988000000, end: 1745991600000 },
  { title: "My Task 13", type: "HOLIDAY", start: 1746506400000, end: 1746513600000 },
  // ... rest of your events
];

function App() {
  // Current week start (Sunday)
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  // Events state
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem("events");
    return stored ? JSON.parse(stored) : initialEvents;
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Persist events to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Navigation
  const handlePrev = () => setCurrentWeekStart(addDaysToDate(currentWeekStart, -7));
  const handleNext = () => setCurrentWeekStart(addDaysToDate(currentWeekStart, 7));
  const handleToday = () => setCurrentWeekStart(getStartOfWeek(new Date()));

  // Open modal for creating new event
  const handleSlotClick = ({ date, hour }) => {
    const start = addHours(date, hour).getTime();
    const end = start + 3600 * 1000; // 1 hour default
    setSelectedEvent({ start, end });
    setModalOpen(true);
  };

  // Open modal for editing existing event
  const handleEventClick = (event) => {
    if (event.remove) {
      setEvents(events.filter((e) => e !== event));
    } else {
      setSelectedEvent(event);
      setModalOpen(true);
    }
  };

  // Save event (new or edited)
  const handleSaveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.find((e) => e.title === event.title && e.start === event.start);
      if (exists) {
        return prev.map((e) => (e === selectedEvent ? event : e));
      } else {
        return [...prev, event];
      }
    });
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <CalendarHeader
        currentWeekStart={currentWeekStart}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />

      <CalendarGrid
        currentWeekStart={currentWeekStart}
        events={events}
        onSlotClick={handleSlotClick}
        onEventClick={handleEventClick}
      />

      {modalOpen && (
        <EventModal
          event={selectedEvent}
          onSave={handleSaveEvent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
