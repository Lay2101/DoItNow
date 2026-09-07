import React, { useState } from 'react';
import { NextWeekTask, TaskCategory } from '../types';
import {
  CalendarClock,
  PlusCircle,
  Briefcase,
  GraduationCap,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface NextWeekScreenProps {
  nextTasks: NextWeekTask[];
  onToggleReady: (id: string) => void;
  onAddNextTask: (newTask: Omit<NextWeekTask, 'id'>) => void;
  onDeleteNextTask: (id: string) => void;
  onMoveToThisWeek: (task: NextWeekTask) => void;
}

export const NextWeekScreen: React.FC<NextWeekScreenProps> = ({
  nextTasks,
  onToggleReady,
  onAddNextTask,
  onDeleteNextTask,
  onMoveToThisWeek,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('study');
  const [targetDay, setTargetDay] = useState('Early next week');
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddNextTask({
      title: title.trim(),
      category,
      targetDay,
      isImportant,
      isReady: false,
    });

    setTitle('');
    setIsImportant(false);
  };

  const totalNextTasks = nextTasks.length;
  const readyNextTasks = nextTasks.filter((t) => t.isReady).length;
  const importantNextTasks = nextTasks.filter((t) => t.isImportant).length;

  return (
    <div id="screen-next-week" className="space-y-6 pb-12">
      {/* Screen Header */}
      <section
        id="next-week-header"
        className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <CalendarClock className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Lookahead Planning
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Prepare for Next Week’s Tasks
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-1">
          Juggling university and a job means scheduling ahead before Monday arrives unexpectedly.
        </p>

        {/* Counter cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-stone-950/70 border border-stone-800 p-3.5 rounded-xl">
            <span className="text-xs text-stone-400 font-medium block">
              Tasks Prepared
            </span>
            <span className="text-3xl font-extrabold text-white mt-1 block">
              {totalNextTasks}
            </span>
          </div>

          <div className="bg-stone-950/70 border border-emerald-900/50 p-3.5 rounded-xl">
            <span className="text-xs text-emerald-300 font-medium block">
              Ready to Go
            </span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block">
              {readyNextTasks}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-stone-950/70 border border-amber-900/50 p-3.5 rounded-xl">
            <span className="text-xs text-amber-300 font-medium block">
              High Priority Next Week
            </span>
            <span className="text-3xl font-extrabold text-amber-400 mt-1 block">
              {importantNextTasks}
            </span>
          </div>
        </div>
      </section>

      {/* Prepare Next Week Form */}
      <section
        id="add-next-week-task-card"
        className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <PlusCircle className="w-5 h-5 text-emerald-600" />
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            Plan a task for next week
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="next-task-title-input"
              className="block text-sm font-semibold text-stone-700 mb-1"
            >
              Task or preparation needed
            </label>
            <input
              id="next-task-title-input"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Ask manager for shift swap on exam day, or Start thesis draft"
              className="w-full text-base sm:text-lg px-4 py-3 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category Toggle */}
            <div>
              <span className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">
                Category
              </span>
              <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200">
                <button
                  type="button"
                  id="next-category-study-btn"
                  onClick={() => setCategory('study')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
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
                  id="next-category-work-btn"
                  onClick={() => setCategory('work')}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    category === 'work'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  Work
                </button>
              </div>
            </div>

            {/* Target Day */}
            <div>
              <label
                htmlFor="next-task-day-select"
                className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide"
              >
                Target Timing Next Week
              </label>
              <select
                id="next-task-day-select"
                value={targetDay}
                onChange={(e) => setTargetDay(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-300 bg-stone-50 text-sm font-medium text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Monday next week">Monday next week</option>
                <option value="Tuesday next week">Tuesday next week</option>
                <option value="Wednesday next week">Wednesday next week</option>
                <option value="Thursday next week">Thursday next week</option>
                <option value="Friday next week">Friday next week</option>
                <option value="Weekend next week">Next Weekend</option>
                <option value="Anytime next week">Anytime next week</option>
              </select>
            </div>
          </div>

          {/* Important Checkbox */}
          <label
            htmlFor="next-task-important-checkbox"
            className="flex items-center gap-3 p-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              id="next-task-important-checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
              className="w-5 h-5 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-800">
                Mark as High Priority for Next Week
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                Important
              </span>
            </div>
          </label>

          <button
            type="submit"
            id="submit-next-task-button"
            className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          >
            <PlusCircle className="w-5 h-5" />
            Save for Next Week
          </button>
        </form>
      </section>

      {/* Next Week List */}
      <section id="next-week-tasks-list" className="space-y-4">
        <div className="px-1">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900">
            Tasks Scheduled for Next Week ({nextTasks.length})
          </h3>
          <p className="text-xs sm:text-sm text-stone-500">
            Review your upcoming load so you can start early or notify professors & managers.
          </p>
        </div>

        <div className="space-y-3">
          {nextTasks.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-6">
              <p className="text-base font-semibold text-stone-700">
                No next week tasks planned yet.
              </p>
              <p className="text-sm text-stone-500 mt-1">
                Add an upcoming assignment or shift above.
              </p>
            </div>
          ) : (
            nextTasks.map((task) => (
              <div
                key={task.id}
                id={`next-task-item-${task.id}`}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                  task.isReady
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                    : task.isImportant
                    ? 'bg-white border-amber-300 ring-1 ring-amber-300/40 shadow-xs'
                    : 'bg-white border-stone-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Toggle ready button */}
                    <button
                      type="button"
                      id={`toggle-ready-${task.id}`}
                      onClick={() => onToggleReady(task.id)}
                      aria-label={`Mark task as ${task.isReady ? 'pending' : 'prepared'}`}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border cursor-pointer transition-colors ${
                        task.isReady
                          ? 'bg-emerald-600 border-emerald-700 text-white'
                          : 'bg-stone-50 border-stone-300 hover:border-emerald-500 text-transparent'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 ${task.isReady ? 'stroke-[2.5]' : 'opacity-0'}`}
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            task.category === 'study'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {task.category === 'study' ? (
                            <>
                              <GraduationCap className="w-3.5 h-3.5" /> Study
                            </>
                          ) : (
                            <>
                              <Briefcase className="w-3.5 h-3.5" /> Work
                            </>
                          )}
                        </span>

                        {task.isImportant && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500 text-stone-950">
                            <AlertTriangle className="w-3.5 h-3.5" /> Important
                          </span>
                        )}

                        <span className="text-xs text-stone-500">
                          {task.targetDay}
                        </span>

                        {task.isReady && (
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Prepared
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-base sm:text-lg font-medium leading-snug break-words ${
                          task.isReady ? 'text-emerald-950' : 'text-stone-900'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Move to This Week or Delete */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      id={`move-to-this-week-${task.id}`}
                      onClick={() => onMoveToThisWeek(task)}
                      title="Move into This Week's active list"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4 text-emerald-700" />
                      Move to This Week
                    </button>

                    <button
                      type="button"
                      id={`delete-next-task-${task.id}`}
                      onClick={() => onDeleteNextTask(task.id)}
                      title="Delete planned task"
                      className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
