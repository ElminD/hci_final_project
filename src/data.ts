// src/data.ts
import { Task } from './types';

// Get today's date in YYYY-MM-DD format
export const TODAY_DATE = new Date().toISOString().split('T')[0];

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Take out trash',
    date: TODAY_DATE,
    completionTimeGoal: '7:00 PM',
    repeatDays: ['S', 'M', 'T', 'W', 'H', 'F'],
    monthlyPattern: null,
    isOverdue: false,
    isComplete: false,
    categoryTags: ['Cleaning'],
    preDeadlineAlerts: [],
    defaultSnoozeMinutes: null,
  },
  {
    id: '2',
    title: 'Clean kitchen',
    date: TODAY_DATE,
    completionTimeGoal: '7:00 PM',
    repeatDays: ['S', 'M', 'T', 'W', 'H', 'F'],
    monthlyPattern: null,
    isOverdue: true,
    isComplete: false,
    url: 'https://example.com/cleaning-checklist',
    notes: 'Deep clean counters and sink.',
    categoryTags: ['Cleaning'],
    preDeadlineAlerts: [10],
    defaultSnoozeMinutes: 10,
  },
  {
    id: '3',
    title: 'Do laundry',
    date: TODAY_DATE,
    completionTimeGoal: '9:00 PM',
    repeatDays: ['S', 'M', 'T', 'W', 'H', 'F'],
    monthlyPattern: null,
    isOverdue: false,
    isComplete: false,
    categoryTags: ['Home'],
    preDeadlineAlerts: [],
    defaultSnoozeMinutes: null,
  },
  {
    id: '4',
    title: 'Water plants',
    date: TODAY_DATE,
    completionTimeGoal: '6:00 PM',
    repeatDays: ['S', 'M', 'T', 'W', 'H', 'F'],
    monthlyPattern: null,
    isOverdue: false,
    isComplete: false,
    categoryTags: ['Home'],
    preDeadlineAlerts: [5, 10],
    defaultSnoozeMinutes: 5,
  },
  {
    id: '5',
    title: 'Monthly budget review',
    date: (() => {
      const date = new Date(TODAY_DATE);
      date.setDate(date.getDate() + 6);
      return date.toISOString().split('T')[0];
    })(),
    completionTimeGoal: '2:00 PM',
    repeatDays: [],
    monthlyPattern: 'THIRD_SATURDAY',
    isOverdue: false,
    isComplete: false,
    location: 'Home office',
    description: 'Review expenses and update budget spreadsheet',
    categoryTags: ['Work', 'Personal'],
    preDeadlineAlerts: [15],
    defaultSnoozeMinutes: 15,
  },
];
