import React, { useState } from 'react';
import { Task, TaskCategory } from '../types';
import {
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Sparkles,
  Trash2,
  Filter,
} from 'lucide-react';

interface ThisWeekScreenProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onAddTask: (newTask: Omit<Task, 'id'>) => void;
  onDeleteTask: (id: string) => void;
}

export const ThisWeekScreen: React.FC<ThisWeekScreenProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) => {
  // Input state for "write the tasks down"
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('study');
  const [isImportant, setIsImportant] = useState(false);
  const [dueDay, setDueDay] = useState('This week');
  const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'done' | 'important'>('all');

  // Calculate numbers in the student's own words
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.isDone).length;
  const tasksToDo = tasks.filter((t) => !t.isDone).length;
  const importantTasksToDo = tasks.filter((t) => !t.isDone && t.isImportant).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddTask({
      title: taskTitle.trim(),
      category,
      dueDay,
      isImportant,
      isDone: false,
    });

    setTaskTitle('');
    setIsImportant(false);
  };

  // Filter tasks based on student selection
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'todo') return !task.isDone;
    if (activeFilter === 'done') return task.isDone;
    if (activeFilter === 'important') return task.isImportant && !task.isDone;
    return true;
  });

  return (
    <div id="screen-this-week" className="space-y-6 pb-12">
      {/* Student Job Header: In their own words */}
      <section
        id="weekly-overview-metrics"
        aria-label="Weekly numbers overview"
        className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-sm"
      >
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            This Week’s Summary
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
            What you have to do & what you’ve finished
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-1">
            Check your numbers at a glance so study and work don’t collide.
          </p>
        </div>

        {/* 3 Large Stat Cards - Easy to read at arm's length on phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Box 1: Tasks to do */}
          <div
            id="metric-tasks-to-do"
            className="bg-stone-950/70 border border-stone-800 p-4 rounded-xl flex flex-col justify-between"
          >
            <span className="text-sm font-medium text-stone-300">
              Tasks I have to do
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-white">
                {tasksToDo}
              </span>
              <span className="text-xs text-stone-400">
                left this week
              </span>
            </div>
          </div>

          {/* Box 2: Tasks finished */}
          <div
            id="metric-tasks-done"
            className="bg-stone-950/70 border border-emerald-900/50 p-4 rounded-xl flex flex-col justify-between"
          >
            <span className="text-sm font-medium text-emerald-300">
              Tasks I’ve finished
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-emerald-400">
                {doneTasks}
              </span>
              <span className="text-xs text-emerald-300/80">
                of {totalTasks} done
              </span>
            </div>
          </div>

          {/* Box 3: Important tasks to do */}
          <div
            id="metric-important-tasks"
            className={`p-4 rounded-xl flex flex-col justify-between border ${
              importantTasksToDo > 0
                ? 'bg-amber-950/40 border-amber-500/50'
                : 'bg-stone-950/70 border-stone-800'
            }`}
          >
            <span className="text-sm font-medium text-amber-200 flex items-center gap-1.5">
              {importantTasksToDo > 0 && <AlertTriangle className="w-4 h-4 text-amber-400" />}
              Important tasks to do
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span
                className={`text-4xl font-extrabold ${
                  importantTasksToDo > 0 ? 'text-amber-400' : 'text-stone-300'
                }`}
              >
                {importantTasksToDo}
              </span>
              <span className="text-xs text-amber-200/80">
                must not miss!
              </span>
            </div>
          </div>
        </div>

        {/* Prominent Reminder for Important Tasks */}
        {importantTasksToDo > 0 ? (
          <div
            id="important-tasks-alert-banner"
            className="mt-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-100">
              <strong className="font-semibold text-amber-300">
                Important Reminder:
              </strong>{' '}
              You have {importantTasksToDo} high-priority{' '}
              {importantTasksToDo === 1 ? 'task' : 'tasks'} waiting. Complete these
              first so you don’t risk your grades or job standing.
            </div>
          </div>
        ) : (
          <div
            id="important-tasks-clear-banner"
            className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2.5 text-xs sm:text-sm text-emerald-200"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>All important tasks for this week are finished or checked off. Great pacing!</span>
          </div>
        )}
      </section>

      {/* SECTION: Write the tasks down */}
      <section
        id="write-tasks-section"
        aria-label="Write tasks down"
        className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <PlusCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            Write down a new task
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="new-task-title-input"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              What is the task?
            </label>
            <input
              id="new-task-title-input"
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Finish econometrics assignment or Prepare weekly report"
              className="w-full text-base sm:text-lg px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Category Selector + Important Checkbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Category Toggle: Study vs Work */}
            <div>
              <span className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">
                Area (Study vs Job)
              </span>
              <div
                id="task-category-picker"
                className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200"
              >
                <button
                  type="button"
                  id="category-study-btn"
                  onClick={() => setCategory('study')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                    category === 'study'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  Studies
                </button>
                <button
                  type="button"
                  id="category-work-btn"
                  onClick={() => setCategory('work')}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                    category === 'work'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Work / Job
                </button>
              </div>
            </div>

            {/* Due day & Important flag */}
            <div className="flex flex-col justify-between">
              <div>
                <label
                  htmlFor="task-due-day-select"
                  className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide"
                >
                  Target Day
                </label>
                <select
                  id="task-due-day-select"
                  value={dueDay}
                  onChange={(e) => setDueDay(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-stone-300 bg-stone-50 text-sm font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Weekend">Weekend</option>
                  <option value="This week">Anytime this week</option>
                </select>
              </div>
            </div>
          </div>

          {/* Important Checkbox (Big touch target for phone) */}
          <div className="pt-1">
            <label
              htmlFor="task-is-important-checkbox"
              className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                id="task-is-important-checkbox"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
                className="w-5 h-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-stone-800">
                  Mark as Important (Remind me)
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                  High priority
                </span>
              </div>
            </label>
          </div>

          <button
            type="submit"
            id="submit-task-button"
            className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task to This Week
          </button>
        </form>
      </section>

      {/* SECTION: Check the tasks & Highlight green if done */}
      <section
        id="check-tasks-section"
        aria-label="Task check list"
        className="space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <span>This Week’s Tasks ({filteredTasks.length})</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Tap a task to mark it done. Completed tasks turn green!
            </p>
          </div>

          {/* Filters for quick sorting on phone */}
          <div
            id="tasks-filter-bar"
            className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-lg text-xs font-medium self-start sm:self-auto overflow-x-auto"
          >
            <Filter className="w-3.5 h-3.5 text-stone-500 ml-1 mr-0.5" />
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1.5 rounded-md transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('todo')}
              className={`px-2.5 py-1.5 rounded-md transition-all ${
                activeFilter === 'todo'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              To Do ({tasksToDo})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('done')}
              className={`px-2.5 py-1.5 rounded-md transition-all ${
                activeFilter === 'done'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Done ({doneTasks})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('important')}
              className={`px-2.5 py-1.5 rounded-md transition-all ${
                activeFilter === 'important'
                  ? 'bg-amber-500 text-stone-950 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Urgent ({importantTasksToDo})
            </button>
          </div>
        </div>

        {/* Task Cards List */}
        <div id="tasks-list" className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-6">
              <Sparkles className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-base font-semibold text-stone-700">
                No tasks match this filter
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Write a new task above or switch back to view all tasks.
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isDone = task.isDone;
              return (
                <div
                  key={task.id}
                  id={`task-item-${task.id}`}
                  className={`relative p-4 sm:p-5 rounded-2xl transition-all duration-200 border ${
                    isDone
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                      : task.isImportant
                      ? 'bg-white border-amber-300/90 ring-1 ring-amber-300/50 shadow-xs'
                      : 'bg-white border-stone-200 shadow-xs hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Left: Big Checkbox + Task Title */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        id={`toggle-task-${task.id}`}
                        onClick={() => onToggleTask(task.id)}
                        aria-label={`Mark task "${task.title}" as ${
                          isDone ? 'not done' : 'done'
                        }`}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 cursor-pointer transition-colors border ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                            : 'bg-stone-50 border-stone-300 hover:border-emerald-500 text-transparent'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${
                            isDone ? 'stroke-[2.5]' : 'opacity-0'
                          }`}
                        />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          {/* Category Badge: Study vs Work */}
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              task.category === 'study'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {task.category === 'study' ? (
                              <>
                                <GraduationCap className="w-3.5 h-3.5" />
                                Study
                              </>
                            ) : (
                              <>
                                <Briefcase className="w-3.5 h-3.5" />
                                Work
                              </>
                            )}
                          </span>

                          {/* Important Reminder Badge */}
                          {task.isImportant && !isDone && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 animate-pulse">
                              <AlertTriangle className="w-3.5 h-3.5 text-stone-950" />
                              Important Reminder
                            </span>
                          )}

                          {/* Highlight Green Badge if Done */}
                          {isDone && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                              ✓ Done
                            </span>
                          )}

                          {/* Due day */}
                          <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                            <Clock className="w-3 h-3 text-stone-400" />
                            {task.dueDay}
                          </span>
                        </div>

                        {/* Task Title with responsive sizing */}
                        <p
                          className={`text-base sm:text-lg font-medium leading-snug break-words ${
                            isDone
                              ? 'line-through text-emerald-800/80'
                              : 'text-stone-900'
                          }`}
                        >
                          {task.title}
                        </p>
                      </div>
                    </div>

                    {/* Delete action button */}
                    <button
                      type="button"
                      id={`delete-task-${task.id}`}
                      onClick={() => onDeleteTask(task.id)}
                      title="Delete task"
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
