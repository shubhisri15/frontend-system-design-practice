import { addDaysToDate, addHours } from "../utils/dateUtils";
import { addDays, setHours } from "date-fns"

function TimeSlot({ date, hour, events, onSlotClick, onEventClick }) {
  const handleClick = () => {
    if (date.getDay() === 0) return; // Disable Sunday
    onSlotClick({ date, hour });
  };

  return (
    <div className="time-slot" onClick={handleClick}>
      {events.map((event) => (
        <EventBlock key={event.title + event.start} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
}


function EventBlock({ event, onClick }) {
  return (
    <div
      className={`event-block ${event.type.toLowerCase()}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
    >
      {event.title}
      <button className="remove-btn" onClick={() => onClick({...event, remove:true})}>X</button>
    </div>
  );
}


export default function CalendarGrid({ currentWeekStart, events, onSlotClick, onEventClick }) {
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0 → 23

  return (
    <div className="calendar-grid">
      {hours.map((hour) => (
        <div key={hour} className="hour-row" data-hour={`${hour}:00`}>
          {/* Left column: hour label */}
          <div className="hour-label">
            {hour === 0
              ? "12 AM"
              : hour < 12
              ? `${hour} AM`
              : hour === 12
              ? "12 PM"
              : `${hour - 12} PM`}
          </div>

          {/* 7 days */}
          {Array.from({ length: 7 }).map((_, dayIdx) => {
            const date = addDays(currentWeekStart, dayIdx);
            const slotStart = setHours(date, hour);

            const slotEvents = events.filter(
              (e) => slotStart.getTime() >= e.start && slotStart.getTime() < e.end
            );

            return (
              <TimeSlot
                key={dayIdx}
                date={date}
                hour={hour}
                events={slotEvents}
                onSlotClick={onSlotClick}
                onEventClick={onEventClick}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
