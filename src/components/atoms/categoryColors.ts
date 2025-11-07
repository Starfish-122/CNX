export type TagCategory = 'status' | 'location' | 'partySize' | 'mood' | 'service';

export const NEUTRAL = { base: 'bg-slate-200 text-gray-900 dark:bg-slate-700 dark:text-gray-100' };

export const CATEGORY_COLOR: Record<TagCategory, { base: string; hover?: string }> = {
  // Status - 핑크
  status:   { base: 'bg-rose-100 text-gray-900 dark:bg-rose-300 dark:text-gray-900' },
  // Location - 그레이
  location: { base: 'bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-50' },
  // PartySize - 노랑
  partySize:{ base: 'bg-amber-100 text-gray-900 dark:bg-amber-300 dark:text-gray-900' },
  // Mood - 블루
  mood:     { base: 'bg-sky-100 text-gray-900 dark:bg-sky-300 dark:text-gray-900' },
  // Service - 그린
  service:  { base: 'bg-emerald-100 text-gray-900 dark:bg-emerald-300 dark:text-gray-900' },
};
