import React, { useState } from 'react';
import { ProductivityTip } from '../types';
import {
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  Zap,
  Calendar,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface TipsScreenProps {
  tips: ProductivityTip[];
}

export const TipsScreen: React.FC<TipsScreenProps> = ({ tips }) => {
  const [triedTips, setTriedTips] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleTried = (id: string) => {
    setTriedTips((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = ['All', 'Energy', 'Planning', 'Time Management'];

  const filteredTips =
    selectedCategory === 'All'
      ? tips
      : tips.filter((tip) => tip.tag === selectedCategory);

  return (
    <div id="screen-productivity-tips" className="space-y-6 pb-12">
      {/* Header section */}
      <section
        id="tips-header"
        className="bg-stone-900 text-stone-100 rounded-2xl p-5 sm:p-6 border border-stone-800 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Work + Study Playbook
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Tips on How to Be Productive Next Time
        </h2>
        <p className="text-stone-300 text-sm sm:text-base mt-1">
          Proven routines for students working full-time or part-time so you never have to choose between keeping your job and keeping your grades.
        </p>

        {/* Quick category filter for arm's-length tapping on phones */}
        <div className="flex flex-wrap gap-2 mt-4 pt-2 border-t border-stone-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Productivity Tips List */}
      <section id="tips-cards-list" className="space-y-4">
        {filteredTips.map((tip, index) => {
          const isTried = !!triedTips[tip.id];
          return (
            <div
              key={tip.id}
              id={`tip-card-${tip.id}`}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                isTried
                  ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300/60 shadow-xs'
                  : 'bg-white border-stone-200 shadow-xs hover:border-stone-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center border border-stone-200">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {tip.tag}
                  </span>
                </div>

                {/* Mark as tried button */}
                <button
                  type="button"
                  id={`toggle-try-tip-${tip.id}`}
                  onClick={() => toggleTried(tip.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isTried
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
                  }`}
                >
                  {isTried ? (
                    <>
                      <BookmarkCheck className="w-4 h-4" />
                      Saved to My Habits
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-stone-500" />
                      Try this habit
                    </>
                  )}
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
                {tip.title}
              </h3>
              <p className="text-sm font-semibold text-emerald-800 mb-3">
                {tip.subtitle}
              </p>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-4">
                {tip.description}
              </p>

              {/* Action Box */}
              <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-stone-800">
                  <strong className="font-semibold text-stone-900">
                    Next Action Step:
                  </strong>{' '}
                  {tip.actionStep}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick summary takeaway box */}
      <section
        id="golden-rule-callout"
        className="bg-emerald-950 text-emerald-100 rounded-2xl p-5 sm:p-6 border border-emerald-900 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <Zap className="w-5 h-5" />
          <h4 className="font-bold text-sm sm:text-base uppercase tracking-wider text-emerald-300">
            The Student-Worker Golden Rule
          </h4>
        </div>
        <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
          "Never rely on having willpower late at night after a shift. Schedule your hardest academic assignments when your mind is fresh, and reserve administrative tasks or light reviews for post-work hours."
        </p>
      </section>
    </div>
  );
};
