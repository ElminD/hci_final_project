// src/components/NotificationPreview.tsx
import { Task } from '../types';

interface NotificationPreviewProps {
  task: Task;
  onClose: () => void;
}

type NotificationState = 'coming-up' | 'due' | 'overdue';

function NotificationPreview({ task, onClose }: NotificationPreviewProps) {
  const getNotificationContent = (state: NotificationState) => {
    switch (state) {
      case 'coming-up':
        return {
          title: 'Task Coming Up',
          body: `${task.title} is due at ${task.completionTimeGoal}`,
          time: 'in 15 minutes',
          icon: '⏰',
          bgColor: '#eff6ff',
          borderColor: '#3b82f6',
        };
      case 'due':
        return {
          title: 'Task Due Now',
          body: `${task.title} should be completed now`,
          time: 'now',
          icon: '🔔',
          bgColor: '#fef3c7',
          borderColor: '#f59e0b',
        };
      case 'overdue':
        return {
          title: 'Task Overdue',
          body: `${task.title} is past the deadline (${task.completionTimeGoal})`,
          time: '30 minutes ago',
          icon: '⚠️',
          bgColor: '#fef2f2',
          borderColor: '#ef4444',
        };
    }
  };

  const states: NotificationState[] = ['coming-up', 'due', 'overdue'];

  return (
    <>
      <div className="notification-preview-backdrop" onClick={onClose}></div>

      <div className="notification-preview-modal">
        <div className="notification-preview-header">
          <h3>Notification Preview</h3>
          <button className="close-preview-button" onClick={onClose}>✕</button>
        </div>

        <div className="notification-preview-content">
          <p className="preview-description">
            See how notifications will appear for "{task.title}"
          </p>

          {states.map((state) => {
            const content = getNotificationContent(state);
            return (
              <div key={state} className="preview-section">
                <h4 className="preview-section-title">
                  {state === 'coming-up' && 'Coming Up'}
                  {state === 'due' && 'Due Now'}
                  {state === 'overdue' && 'Overdue'}
                </h4>

                <div
                  className="mobile-notification"
                  style={{
                    backgroundColor: content.bgColor,
                    borderLeftColor: content.borderColor
                  }}
                >
                  <div className="notification-header">
                    <span className="notification-icon">{content.icon}</span>
                    <div className="notification-app-info">
                      <span className="notification-app-name">Chore Task App</span>
                      <span className="notification-time">{content.time}</span>
                    </div>
                  </div>

                  <div className="notification-body">
                    <div className="notification-title">{content.title}</div>
                    <div className="notification-text">{content.body}</div>
                  </div>

                  {task.categoryTags.length > 0 && (
                    <div className="notification-footer">
                      <span className="notification-category">
                        {task.categoryTags[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NotificationPreview;
