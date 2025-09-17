export type TagCategory = 'Status' | 'Location' | 'PartySize' | 'Mood' | 'Service';

export const NEUTRAL = { base: 'bg-slate-200 text-gray-900 dark:bg-slate-700 dark:text-gray-100' };

export const CATEGORY_COLOR: Record<TagCategory, { base: string; hover?: string }> = {
  // Status - 핑크
  Status:   { base: 'bg-rose-200 text-gray-900 dark:bg-rose-300 dark:text-gray-900' },
  // Location - 그레이
  Location: { base: 'bg-gray-200 text-gray-900 dark:bg-gray-600 dark:text-gray-50' },
  // PartySize - 노랑
  PartySize:{ base: 'bg-amber-200 text-gray-900 dark:bg-amber-300 dark:text-gray-900' },
  // Mood - 블루
  Mood:     { base: 'bg-sky-200 text-gray-900 dark:bg-sky-300 dark:text-gray-900' },
  // Service - 그린
  Service:  { base: 'bg-emerald-200 text-gray-900 dark:bg-emerald-300 dark:text-gray-900' },
};
