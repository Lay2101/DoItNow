import React from 'react';
import { ScreenId } from '../types';
import { CheckSquare, CalendarClock, Lightbulb } from 'lucide-react';

interface NavigationProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  pendingImportantCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onSelectScreen,
  pendingImportantCount,
}) => {
  const navItems = [
    {
      id: 'this-week' as ScreenId,
      label: 'This Week',
      sublabel: 'Tasks to do & done',
      icon: CheckSquare,
      badge: pendingImportantCount > 0 ? `${pendingImportantCount} urgent` : undefined,
    },
    {
      id: 'next-week' as ScreenId,
      label: 'Next Week',
      sublabel: 'Prepare ahead',
      icon: CalendarClock,
    },
    {
      id: 'tips' as ScreenId,
      label: 'Productivity Tips',
      sublabel: 'Work & study advice',
      icon: Lightbulb,
    },
  ];

  return (
    <nav
      id="app-navigation"
      aria-label="Main navigation"
      className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-30 shadow-md"
    >
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo / App Name */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-inner">
              ✓
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                DoItNow
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Study + Job
                </span>
              </h1>
              <p className="text-xs text-stone-400">
                Never miss an important work or study deadline
              </p>
            </div>
          </div>
        </div>

        {/* Screen Switcher Tabs (Large touch targets for phone readability) */}
        <div
          id="screen-tabs"
          className="grid grid-cols-3 gap-1.5 w-full sm:w-auto bg-stone-950/80 p-1.5 rounded-xl border border-stone-800"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => onSelectScreen(item.id)}
                type="button"
                className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-center transition-all min-h-[50px] ${
                  isActive
                    ? 'bg-stone-800 text-white font-semibold shadow-sm ring-1 ring-stone-700'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center gap-1.5 text-sm sm:text-base">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isActive ? 'text-emerald-400' : 'text-stone-400'
                    }`}
                  />
                  <span className="whitespace-nowrap font-medium text-xs sm:text-sm">
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span className="mt-0.5 inline-block text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
