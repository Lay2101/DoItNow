import { Task, NextWeekTask, ProductivityTip } from './types';

/**
 * Single data file holding all initial invented values for DoItNow.
 * All initial rows are realistic examples of an undergraduate/master/PhD student balancing study and work.
 */

export const INITIAL_THIS_WEEK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Submit Chapter 3 thesis draft to Professor Lee',
    category: 'study',
    dueDay: 'Thursday',
    isImportant: true,
    isDone: false,
  },
  {
    id: 'task-2',
    title: 'Prepare weekly client update slides for work supervisor',
    category: 'work',
    dueDay: 'Wednesday',
    isImportant: true,
    isDone: false,
  },
  {
    id: 'task-3',
    title: 'Complete Problem Set 2 for Econometrics class',
    category: 'study',
    dueDay: 'Tuesday',
    isImportant: false,
    isDone: true,
  },
  {
    id: 'task-4',
    title: 'Review and sign off shift handover log for part-time role',
    category: 'work',
    dueDay: 'Monday',
    isImportant: false,
    isDone: true,
  },
  {
    id: 'task-5',
    title: 'Revise research methodology section for ethics review board',
    category: 'study',
    dueDay: 'Friday',
    isImportant: true,
    isDone: false,
  },
  {
    id: 'task-6',
    title: 'Submit monthly expense claim report to HR department',
    category: 'work',
    dueDay: 'Friday',
    isImportant: false,
    isDone: false,
  },
];

export const INITIAL_NEXT_WEEK_TASKS: NextWeekTask[] = [
  {
    id: 'next-1',
    title: 'Conduct pilot interview for thesis research study',
    category: 'study',
    targetDay: 'Monday next week',
    isImportant: true,
    isReady: false,
  },
  {
    id: 'next-2',
    title: 'Confirm work roster & request time off for midterm week',
    category: 'work',
    targetDay: 'Tuesday next week',
    isImportant: true,
    isReady: true,
  },
  {
    id: 'next-3',
    title: 'Read assigned chapters 6-8 in Strategic Leadership textbook',
    category: 'study',
    targetDay: 'Wednesday next week',
    isImportant: false,
    isReady: false,
  },
  {
    id: 'next-4',
    title: 'Build quarterly sales forecast spreadsheet for work team',
    category: 'work',
    targetDay: 'Thursday next week',
    isImportant: false,
    isReady: false,
  },
];

export const INITIAL_PRODUCTIVITY_TIPS: ProductivityTip[] = [
  {
    id: 'tip-1',
    title: 'Study Before Your Shift, Not After',
    subtitle: 'Protect your peak mental energy',
    description:
      'Brain fatigue after a 6-to-8 hour work shift makes absorbing complex academic reading nearly twice as slow. Spend 60–90 minutes on your hardest study task in the morning before reporting to work.',
    actionStep: 'Book a 7:30 AM study sprint for your thesis or problem set before heading to your job.',
    tag: 'Energy',
  },
  {
    id: 'tip-2',
    title: 'The "Two-Week Radar" for Exams & Shifts',
    subtitle: 'Prevent last-minute emergency panic',
    description:
      'Put all major assignment deadlines and exam dates into your work calendar at least two weeks in advance. Managers are 5x more willing to approve shift adjustments when asked early.',
    actionStep: 'Check your syllabus now and mark the next 2 major submission dates on your work calendar.',
    tag: 'Planning',
  },
  {
    id: 'tip-3',
    title: 'The Non-Negotiable "One of Each" Rule',
    subtitle: 'Never drop study or work completely',
    description:
      'Every morning, choose exactly ONE critical study task and ONE critical job task. When you finish those two, your day is a baseline success even if unexpected crises happen later.',
    actionStep: 'Pick your top 1 study item and top 1 work item for today right now.',
    tag: 'Time Management',
  },
  {
    id: 'tip-4',
    title: 'The 20-Minute Transition Buffer',
    subtitle: 'Switch modes cleanly without burnout',
    description:
      'Going straight from work emails to writing academic papers causes cognitive friction. Take a 20-minute physical break—a brisk walk, quiet snack, or shower—to signal to your brain that the workday is closed.',
    actionStep: 'Schedule a firm 20-minute buffer between leaving work and starting your study block.',
    tag: 'Energy',
  },
];
