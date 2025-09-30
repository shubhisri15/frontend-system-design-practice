import { addDaysToDate, formatDay } from "../utils/dateUtils"

export default function CalendarHeader({ currentWeekStart, onPrev, onNext, onToday }) {
  const days = Array.from({ length: 7 }).map((_, i) => addDaysToDate(currentWeekStart, i));
  
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>Prev</button>
      <button onClick={onToday}>Today</button>
      <button onClick={onNext}>Next</button>
      {days.map((day) => (
        <div
          key={day}
          className={`day-header ${isToday(day) ? "today" : ""}`}
        >
          {formatDay(day)}
        </div>
      ))}
    </div>
  );
}

const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
