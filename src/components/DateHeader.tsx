// src/components/DateHeader.tsx
interface DateHeaderProps {
  selectedDate: string;
  todayDate: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
}

function DateHeader({ selectedDate, todayDate, onPreviousDay, onNextDay }: DateHeaderProps) {
  const date = new Date(selectedDate + 'T00:00:00');
  const isToday = selectedDate === todayDate;

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = dayNames[date.getDay()];
  const shortDayName = dayName.substring(0, 3);
  const monthName = monthNames[date.getMonth()];
  const dayNumber = date.getDate();

  const title = isToday ? 'Today' : `${shortDayName}, ${monthName} ${dayNumber}`;
  const subtitle = `${dayName}, ${monthName} ${dayNumber}`;

  return (
    <div className="date-header">
      <div className="date-header-content">
        <div className="date-info">
          <h1 className="date-title">{title}</h1>
          <p className="date-subtitle">{subtitle}</p>
        </div>

        <div className="date-navigation">
          <button
            className="nav-button"
            onClick={onPreviousDay}
            aria-label="Previous day"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
            </svg>
          </button>

          <button
            className="calendar-button"
            aria-label="Calendar"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            className="nav-button"
            onClick={onNextDay}
            aria-label="Next day"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DateHeader;
