export type TaskCategory = 'study' | 'work';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  dueDay: string;
  isImportant: boolean;
  isDone: boolean;
}

export interface NextWeekTask {
  id: string;
  title: string;
  category: TaskCategory;
  targetDay: string;
  isImportant: boolean;
  isReady: boolean;
}

export interface ProductivityTip {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionStep: string;
  tag: 'Time Management' | 'Energy' | 'Planning' | 'Communication';
}

export type ScreenId = 'this-week' | 'next-week' | 'tips';
