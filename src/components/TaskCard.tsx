// src/components/TaskCard.tsx
import { useState } from 'react';
import { Task } from '../types';
import DayOfWeekChips from './DayOfWeekChips';

interface TaskCardProps {
  task: Task;
  isHighlighted: boolean;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

function TaskCard({ task, isHighlighted, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const monthlyPatternText = task.monthlyPattern === 'LAST_DAY'
    ? 'Last day of month'
    : task.monthlyPattern === 'THIRD_SATURDAY'
    ? 'Third Saturday'
    : null;

  return (
    <div className={`task-card ${task.isOverdue ? 'overdue' : ''} ${task.isComplete ? 'completed' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
      {isHighlighted && (
        <div className="new-task-badge">New task added!</div>
      )}

      <div className="task-card-main">
        <button
          className="task-checkbox"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.isComplete ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <div className={`radio-circle ${task.isComplete ? 'checked' : ''}`}>
            {task.isComplete && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M5.5 10.5L2 7l1.5-1.5L5.5 7.5l5-5L12 4z" />
              </svg>
            )}
          </div>
        </button>

        <div className="task-content">
          <div className="task-title">{task.title}</div>

          <div className="task-time">
            by {task.completionTimeGoal}
            {task.isOverdue && <span className="overdue-label"> • Overdue</span>}
          </div>

          {task.repeatDays.length > 0 && (
            <div className="task-repeat">
              <DayOfWeekChips
                selectedDays={task.repeatDays}
                interactive={false}
                onToggle={() => {}}
              />
            </div>
          )}

          {monthlyPatternText && (
            <div className="monthly-pattern">
              🗓️ {monthlyPatternText}
            </div>
          )}

          {task.categoryTags.length > 0 && (
            <div className="category-tags">
              {task.categoryTags.map(tag => (
                <span key={tag} className="category-tag">{tag}</span>
              ))}
            </div>
          )}

          {(task.location || task.url) && (
            <div className="task-metadata">
              {task.location && (
                <div className="metadata-item">
                  📍 {task.location}
                </div>
              )}
              {task.url && (
                <div className="metadata-item">
                  <a href={task.url} target="_blank" rel="noopener noreferrer">
                    🔗 Link
                  </a>
                </div>
              )}
            </div>
          )}

          {(task.description || task.notes) && (
            <button
              className="info-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              ℹ️ {showDetails ? 'Hide' : 'Show'} details
            </button>
          )}

          {showDetails && (
            <div className="task-details">
              {task.description && (
                <div className="detail-section">
                  <strong>Description:</strong>
                  <p>{task.description}</p>
                </div>
              )}
              {task.notes && (
                <div className="detail-section">
                  <strong>Notes:</strong>
                  <p>{task.notes}</p>
                </div>
              )}
              {task.preDeadlineAlerts.length > 0 && (
                <div className="detail-section">
                  <strong>Alerts:</strong>
                  <p>{task.preDeadlineAlerts.join(', ')} min before</p>
                </div>
              )}
              {task.defaultSnoozeMinutes && (
                <div className="detail-section">
                  <strong>Snooze:</strong>
                  <p>{task.defaultSnoozeMinutes} minutes</p>
                </div>
              )}
            </div>
          )}

          <div className="task-actions">
            <button
              className="action-button edit-button"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              ✏️ Edit
            </button>
            <button
              className="action-button delete-button"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
