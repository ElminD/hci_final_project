// src/types.ts

export type DayOfWeek = 'S' | 'M' | 'T' | 'W' | 'H' | 'F';

export type MonthlyPattern = 'LAST_DAY' | 'THIRD_SATURDAY' | null;

export interface Task {
  id: string;
  title: string;
  date: string; // ISO date string (YYYY-MM-DD)
  completionTimeGoal: string; // e.g., "7:00 PM"
  repeatDays: DayOfWeek[];
  monthlyPattern: MonthlyPattern;
  isOverdue: boolean;
  isComplete: boolean;
  url?: string;
  location?: string;
  notes?: string;
  description?: string;
  categoryTags: string[];
  preDeadlineAlerts: number[]; // minutes before
  defaultSnoozeMinutes: number | null;
}

export interface NewTaskFormData {
  title: string;
  date: string;
  completionTimeGoal: string;
  repeatDays: DayOfWeek[];
  monthlyPattern: MonthlyPattern;
  categoryTags: string[];
  location: string;
  url: string;
  description: string;
  preDeadlineAlerts: number[];
  defaultSnoozeMinutes: number | null;
}
