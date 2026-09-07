import { useState } from 'react';
import { ScreenId, Task, NextWeekTask } from './types';
import {
  INITIAL_THIS_WEEK_TASKS,
  INITIAL_NEXT_WEEK_TASKS,
  INITIAL_PRODUCTIVITY_TIPS,
} from './data';
import { Navigation } from './components/Navigation';
import { ThisWeekScreen } from './components/ThisWeekScreen';
import { NextWeekScreen } from './components/NextWeekScreen';
import { TipsScreen } from './components/TipsScreen';
import { CheckSquare, CalendarClock, Lightbulb } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('this-week');

  // Tasks state initialized from the single data file (data.ts)
  const [tasks, setTasks] = useState<Task[]>(() => INITIAL_THIS_WEEK_TASKS);
  const [nextTasks, setNextTasks] = useState<NextWeekTask[]>(() => INITIAL_NEXT_WEEK_TASKS);

  // Screen 1: Toggle task completion
  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  // Screen 1: Add new task to this week
  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [task, ...prev]);
  };

  // Screen 1: Delete task
  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Screen 2: Toggle next week task ready state
  const handleToggleNextReady = (id: string) => {
    setNextTasks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isReady: !item.isReady } : item
      )
    );
  };

  // Screen 2: Add task for next week
  const handleAddNextTask = (newTask: Omit<NextWeekTask, 'id'>) => {
    const task: NextWeekTask = {
      ...newTask,
      id: `next-${Date.now()}`,
    };
    setNextTasks((prev) => [task, ...prev]);
  };

  // Screen 2: Delete planned next week task
  const handleDeleteNextTask = (id: string) => {
    setNextTasks((prev) => prev.filter((item) => item.id !== id));
  };

  // Screen 2: Move a planned task into This Week's active list
  const handleMoveToThisWeek = (nextTask: NextWeekTask) => {
    const convertedTask: Task = {
      id: `task-${Date.now()}`,
      title: nextTask.title,
      category: nextTask.category,
      dueDay: 'This week',
      isImportant: nextTask.isImportant,
      isDone: false,
    };
    setTasks((prev) => [convertedTask, ...prev]);
    setNextTasks((prev) => prev.filter((t) => t.id !== nextTask.id));
    // Switch to Screen 1 so student immediately sees the moved task
    setCurrentScreen('this-week');
  };

  // Calculate important pending tasks for reminder notification badge
  const pendingImportantCount = tasks.filter((t) => !t.isDone && t.isImportant).length;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased">
      {/* Top Header & Screen Navigation */}
      <Navigation
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        pendingImportantCount={pendingImportantCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-5 pb-24">
        {currentScreen === 'this-week' && (
          <ThisWeekScreen
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentScreen === 'next-week' && (
          <NextWeekScreen
            nextTasks={nextTasks}
            onToggleReady={handleToggleNextReady}
            onAddNextTask={handleAddNextTask}
            onDeleteNextTask={handleDeleteNextTask}
            onMoveToThisWeek={handleMoveToThisWeek}
          />
        )}

        {currentScreen === 'tips' && (
          <TipsScreen tips={INITIAL_PRODUCTIVITY_TIPS} />
        )}
      </main>

      {/* Mobile Quick Switcher Floating Bottom Bar (optimizes arm's-length one-handed phone use) */}
      <nav
        id="mobile-bottom-bar"
        aria-label="Mobile quick switcher"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 px-3 py-2"
      >
        <div className="grid grid-cols-3 gap-1 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setCurrentScreen('this-week')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
              currentScreen === 'this-week'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span>This Week</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('next-week')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
              currentScreen === 'next-week'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <CalendarClock className="w-5 h-5 mb-0.5" />
            <span>Next Week</span>
          </button>

          <button
            type="button"
            onClick={() => setCurrentScreen('tips')}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
              currentScreen === 'tips'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-5 h-5 mb-0.5" />
            <span>Tips</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
