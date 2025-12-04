// src/App.tsx
import { useState, useEffect } from 'react';
import { Task, NewTaskFormData } from './types';
import { initialTasks, TODAY_DATE } from './data';
import TaskCard from './components/TaskCard';
import NewTaskSheet from './components/NewTaskSheet';
import DateHeader from './components/DateHeader';
import CategoryFilter from './components/CategoryFilter';
import './styles.css';

const STORAGE_KEY = 'chore-app-tasks';

// Load tasks from localStorage or use initial tasks
const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
  }
  return initialTasks;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_DATE);
  const [isNewTaskSheetOpen, setIsNewTaskSheetOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Get all unique categories from all tasks
  const allCategories = Array.from(
    new Set(tasks.flatMap(task => task.categoryTags))
  ).sort();

  // Filter tasks for the selected date and category
  const filteredTasks = tasks.filter(task => {
    const matchesDate = task.date === selectedDate;
    const matchesCategory = !selectedCategory || task.categoryTags.includes(selectedCategory);
    return matchesDate && matchesCategory;
  });

  const handleSaveTask = (formData: NewTaskFormData) => {
    if (editingTask) {
      // Update existing task
      const updatedTask: Task = {
        ...editingTask,
        title: formData.title,
        date: formData.date || selectedDate,
        completionTimeGoal: formData.completionTimeGoal,
        repeatDays: formData.repeatDays,
        monthlyPattern: formData.monthlyPattern,
        url: formData.url || undefined,
        location: formData.location || undefined,
        notes: formData.description || undefined,
        description: formData.description || undefined,
        categoryTags: formData.categoryTags,
        preDeadlineAlerts: formData.preDeadlineAlerts,
        defaultSnoozeMinutes: formData.defaultSnoozeMinutes,
      };

      setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);

      // Switch to the task's date if different
      if (updatedTask.date !== selectedDate) {
        setSelectedDate(updatedTask.date);
      }
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title,
        date: formData.date || selectedDate,
        completionTimeGoal: formData.completionTimeGoal,
        repeatDays: formData.repeatDays,
        monthlyPattern: formData.monthlyPattern,
        isOverdue: false,
        isComplete: false,
        url: formData.url || undefined,
        location: formData.location || undefined,
        notes: formData.description || undefined,
        description: formData.description || undefined,
        categoryTags: formData.categoryTags,
        preDeadlineAlerts: formData.preDeadlineAlerts,
        defaultSnoozeMinutes: formData.defaultSnoozeMinutes,
      };

      setTasks([...tasks, newTask]);

      // Switch to the task's date if different
      if (newTask.date !== selectedDate) {
        setSelectedDate(newTask.date);
      }

      // Highlight the new task
      setHighlightedTaskId(newTask.id);
      setTimeout(() => {
        setHighlightedTaskId(null);
      }, 3000);

      // Scroll to bottom where new task appears
      setTimeout(() => {
        const taskList = document.querySelector('.task-list');
        if (taskList) {
          taskList.scrollTop = taskList.scrollHeight;
        }
      }, 100);
    }

    setIsNewTaskSheetOpen(false);
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isComplete: !task.isComplete }
        : task
    ));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsNewTaskSheetOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handlePreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <div className="app-container">
      <div className="phone-frame">
        {/* Status Bar */}
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons">
            <span className="signal">●●●●</span>
            <span className="wifi">⌇</span>
            <span className="battery">🔋</span>
          </div>
        </div>

        {/* Date Header */}
        <DateHeader
          selectedDate={selectedDate}
          todayDate={TODAY_DATE}
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
        />

        {/* Category Filter */}
        <CategoryFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks for this day</p>
              <p className="empty-state-hint">Tap + to add a task</p>
            </div>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                isHighlighted={task.id === highlightedTaskId}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          )}
        </div>

        {/* Floating Action Button */}
        <button
          className="fab"
          onClick={() => setIsNewTaskSheetOpen(true)}
          aria-label="Add new task"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>

        {/* New Task Bottom Sheet */}
        {isNewTaskSheetOpen && (
          <NewTaskSheet
            selectedDate={selectedDate}
            editingTask={editingTask}
            onSave={handleSaveTask}
            onCancel={() => {
              setIsNewTaskSheetOpen(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
