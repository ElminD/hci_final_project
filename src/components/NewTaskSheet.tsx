// src/components/NewTaskSheet.tsx
import { useState } from 'react';
import { DayOfWeek, MonthlyPattern, NewTaskFormData, Task } from '../types';
import DayOfWeekChips from './DayOfWeekChips';

interface NewTaskSheetProps {
  selectedDate: string;
  editingTask: Task | null;
  onSave: (data: NewTaskFormData) => void;
  onCancel: () => void;
}

const CATEGORY_OPTIONS = ['Cleaning', 'Errand', 'Work', 'Study', 'Personal', 'Home', 'Other'];

interface ValidationErrors {
  title?: string;
  date?: string;
  completionTimeGoal?: string;
  url?: string;
  categoryTags?: string;
}

function NewTaskSheet({ selectedDate, editingTask, onSave, onCancel }: NewTaskSheetProps) {
  const [formData, setFormData] = useState<NewTaskFormData>({
    title: editingTask?.title || '',
    date: editingTask?.date || selectedDate,
    completionTimeGoal: editingTask?.completionTimeGoal || '7:00 PM',
    repeatDays: editingTask?.repeatDays || [],
    monthlyPattern: editingTask?.monthlyPattern || null,
    categoryTags: editingTask?.categoryTags || [],
    location: editingTask?.location || '',
    url: editingTask?.url || '',
    description: editingTask?.description || editingTask?.notes || '',
    preDeadlineAlerts: editingTask?.preDeadlineAlerts || [],
    defaultSnoozeMinutes: editingTask?.defaultSnoozeMinutes || null,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'transcribed'>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');

  // Validation helper functions
  const validateTitle = (title: string): string | undefined => {
    if (!title.trim()) {
      return 'Task name is required';
    }
    if (title.trim().length > 100) {
      return 'Task name must be less than 100 characters';
    }
    return undefined;
  };

  const validateDate = (date: string): string | undefined => {
    if (!date) {
      return 'Date is required';
    }
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      return 'Cannot schedule tasks in the past';
    }
    return undefined;
  };

  const validateTime = (time: string): string | undefined => {
    if (!time.trim()) {
      return 'Completion time goal is required';
    }
    // Check for basic time format (e.g., "7:00 PM", "12:30 AM", "9:15 PM")
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;
    if (!timeRegex.test(time.trim())) {
      return 'Time must be in format "H:MM AM/PM" (e.g., "7:00 PM")';
    }
    return undefined;
  };

  const validateUrl = (url: string): string | undefined => {
    if (!url.trim()) {
      return undefined; // URL is optional
    }
    try {
      new URL(url);
      return undefined;
    } catch {
      return 'Please enter a valid URL (e.g., https://example.com)';
    }
  };

  const validateCategoryTags = (tags: string[]): string | undefined => {
    if (tags.length === 0) {
      return 'Please select at least one category';
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      title: validateTitle(formData.title),
      date: validateDate(formData.date),
      completionTimeGoal: validateTime(formData.completionTimeGoal),
      url: validateUrl(formData.url),
      categoryTags: validateCategoryTags(formData.categoryTags),
    };

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (newErrors[key as keyof ValidationErrors] === undefined) {
        delete newErrors[key as keyof ValidationErrors];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVoiceInput = () => {
    setVoiceStatus('listening');
    setVoiceTranscript('');

    setTimeout(() => {
      const sampleTranscript = 'Walk the dog';
      setVoiceTranscript(sampleTranscript);
      setVoiceStatus('transcribed');
      setFormData({ ...formData, title: sampleTranscript });
      // Clear title error when voice input is used
      setErrors({ ...errors, title: undefined });

      setTimeout(() => {
        setVoiceStatus('idle');
      }, 2000);
    }, 2000);
  };

  const toggleDay = (day: DayOfWeek) => {
    if (formData.repeatDays.includes(day)) {
      setFormData({
        ...formData,
        repeatDays: formData.repeatDays.filter(d => d !== day),
      });
    } else {
      setFormData({
        ...formData,
        repeatDays: [...formData.repeatDays, day],
      });
    }
  };

  const toggleCategory = (category: string) => {
    if (formData.categoryTags.includes(category)) {
      setFormData({
        ...formData,
        categoryTags: formData.categoryTags.filter(c => c !== category),
      });
    } else {
      setFormData({
        ...formData,
        categoryTags: [...formData.categoryTags, category],
      });
    }
  };

  const togglePreDeadlineAlert = (minutes: number) => {
    if (formData.preDeadlineAlerts.includes(minutes)) {
      setFormData({
        ...formData,
        preDeadlineAlerts: formData.preDeadlineAlerts.filter(m => m !== minutes),
      });
    } else {
      setFormData({
        ...formData,
        preDeadlineAlerts: [...formData.preDeadlineAlerts, minutes].sort((a, b) => a - b),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  // Helper to update form data and clear related error
  const updateFormData = (updates: Partial<NewTaskFormData>, errorKey?: keyof ValidationErrors) => {
    setFormData({ ...formData, ...updates });
    if (errorKey) {
      setErrors({ ...errors, [errorKey]: undefined });
    }
  };

  return (
    <>
      <div className="sheet-backdrop" onClick={onCancel}></div>

      <div className="bottom-sheet">
        <div className="sheet-handle"></div>

        <div className="sheet-header">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <h2>{editingTask ? 'Edit Task' : 'New Task'}</h2>
          <div style={{ width: '60px' }}></div>
        </div>

        <form onSubmit={handleSubmit} className="sheet-content">
          {/* Task Name with Voice Input */}
          <div className="form-group">
            <label htmlFor="title">Task name</label>
            <div className="input-with-icon">
              <input
                id="title"
                type="text"
                className={`text-input ${errors.title ? 'error' : ''}`}
                placeholder="Walk the dog"
                value={formData.title}
                onChange={e => updateFormData({ title: e.target.value }, 'title')}
              />
              <button
                type="button"
                className="icon-button mic-button"
                onClick={handleVoiceInput}
                disabled={voiceStatus === 'listening'}
              >
                🎤
              </button>
            </div>
            {errors.title && <div className="error-message">{errors.title}</div>}
            {voiceStatus === 'listening' && (
              <div className="voice-status listening">Listening...</div>
            )}
            {voiceStatus === 'transcribed' && (
              <div className="voice-status transcribed">
                Transcript: {voiceTranscript}
              </div>
            )}
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              className={`date-input ${errors.date ? 'error' : ''}`}
              value={formData.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => updateFormData({ date: e.target.value }, 'date')}
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>

          {/* Completion Time Goal */}
          <div className="form-group">
            <label htmlFor="time">Completion time goal</label>
            <input
              id="time"
              type="text"
              className={`text-input ${errors.completionTimeGoal ? 'error' : ''}`}
              placeholder="7:00 PM"
              value={formData.completionTimeGoal}
              onChange={e => updateFormData({ completionTimeGoal: e.target.value }, 'completionTimeGoal')}
            />
            {errors.completionTimeGoal && <div className="error-message">{errors.completionTimeGoal}</div>}
          </div>

          {/* Repeat (Weekly) */}
          <div className="form-group">
            <label>Repeat (Weekly)</label>
            <DayOfWeekChips
              selectedDays={formData.repeatDays}
              interactive={true}
              onToggle={toggleDay}
            />
          </div>

          {/* Monthly Pattern */}
          <div className="form-group">
            <label htmlFor="monthly-pattern">Monthly pattern</label>
            <select
              id="monthly-pattern"
              className="select-input"
              value={formData.monthlyPattern || ''}
              onChange={e => setFormData({
                ...formData,
                monthlyPattern: e.target.value === '' ? null : e.target.value as MonthlyPattern,
              })}
            >
              <option value="">None</option>
              <option value="LAST_DAY">Last day of the month</option>
              <option value="THIRD_SATURDAY">Third Saturday of the month</option>
            </select>
          </div>

          {/* Category Tags */}
          <div className="form-group">
            <label>Category</label>
            <div className="category-chips">
              {CATEGORY_OPTIONS.map(category => (
                <button
                  key={category}
                  type="button"
                  className={`category-chip ${formData.categoryTags.includes(category) ? 'selected' : ''}`}
                  onClick={() => {
                    toggleCategory(category);
                    setErrors({ ...errors, categoryTags: undefined });
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
            {errors.categoryTags && <div className="error-message">{errors.categoryTags}</div>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Location (optional)</label>
            <input
              id="location"
              type="text"
              className="text-input"
              placeholder="Apartment, kitchen, front porch"
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* URL */}
          <div className="form-group">
            <label htmlFor="url">URL (optional)</label>
            <input
              id="url"
              type="text"
              className={`text-input ${errors.url ? 'error' : ''}`}
              placeholder="https://..."
              value={formData.url}
              onChange={e => updateFormData({ url: e.target.value }, 'url')}
            />
            {errors.url && <div className="error-message">{errors.url}</div>}
          </div>

          {/* Description / Notes */}
          <div className="form-group">
            <label htmlFor="description">Description / Notes (optional)</label>
            <textarea
              id="description"
              className="textarea-input"
              placeholder="Additional details..."
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
          </div>

          {/* Reminder Controls */}
          <div className="form-section">
            <h3>Reminders</h3>

            <div className="form-group">
              <label>Pre-deadline alerts</label>
              <div className="checkbox-group">
                {[5, 10, 15].map(minutes => (
                  <label key={minutes} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.preDeadlineAlerts.includes(minutes)}
                      onChange={() => togglePreDeadlineAlert(minutes)}
                    />
                    <span>{minutes} minutes before</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Default snooze</label>
              <div className="radio-group">
                {[null, 5, 10, 15].map(minutes => (
                  <label key={minutes?.toString() || 'none'} className="radio-label">
                    <input
                      type="radio"
                      name="snooze"
                      checked={formData.defaultSnoozeMinutes === minutes}
                      onChange={() => setFormData({ ...formData, defaultSnoozeMinutes: minutes })}
                    />
                    <span>{minutes ? `${minutes} minutes` : 'No default'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className="save-button">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default NewTaskSheet;
