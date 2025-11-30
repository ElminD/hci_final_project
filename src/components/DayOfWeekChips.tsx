// src/components/DayOfWeekChips.tsx
import { DayOfWeek } from '../types';

interface DayOfWeekChipsProps {
  selectedDays: DayOfWeek[];
  interactive: boolean;
  onToggle: (day: DayOfWeek) => void;
}

const allDays: DayOfWeek[] = ['S', 'M', 'T', 'W', 'H', 'F'];

function DayOfWeekChips({ selectedDays, interactive, onToggle }: DayOfWeekChipsProps) {
  // Add the second 'S' for Saturday
  const daysToShow = [...allDays, 'S' as DayOfWeek];

  return (
    <div className="day-chips">
      {daysToShow.map((day, index) => {
        const isSelected = selectedDays.includes(day);
        const key = `${day}-${index}`; // Unique key for both Sunday instances

        return (
          <button
            key={key}
            type="button"
            className={`day-chip ${isSelected ? 'selected' : ''} ${!interactive ? 'readonly' : ''}`}
            onClick={() => interactive && onToggle(day)}
            disabled={!interactive}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

export default DayOfWeekChips;
