/**
 * Which questions have been answered, on which day, and whether correctly.
 *
 * An answer is recorded once and never overwritten: a question you could retry
 * is not a question, and the streak it feeds would mean nothing.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import { DAILY_COUNT, scoreDay, streakFrom } from '@/logic/daily';

export const QUIZ_CACHE_KEY = 'quandary.state.v1';

interface QuizState {
  /** Day number -> one boolean per question answered so far, in question order. */
  days: Record<number, boolean[]>;

  answer: (day: number, index: number, correct: boolean) => void;
  answersFor: (day: number) => boolean[];
  scoreFor: (day: number) => number;
  isComplete: (day: number) => boolean;
  streak: (today: number) => number;
  persist: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  days: {},

  answer(day, index, correct) {
    const existing = get().days[day] ?? [];
    // Already answered. Keeping the first answer is what stops a wrong answer
    // being retried into a right one.
    if (existing[index] !== undefined) return;
    const next = [...existing];
    next[index] = correct;
    set((s) => ({ days: { ...s.days, [day]: next } }));
    void get().persist();
  },

  answersFor(day) {
    return (get().days[day] ?? []).filter((a) => typeof a === 'boolean');
  },

  scoreFor(day) {
    return scoreDay(get().answersFor(day));
  },

  isComplete(day) {
    return get().answersFor(day).length >= DAILY_COUNT;
  },

  streak(today) {
    const finished = Object.keys(get().days)
      .map(Number)
      .filter((day) => get().isComplete(day));
    return streakFrom(finished, today);
  },

  async persist() {
    try {
      await AsyncStorage.setItem(QUIZ_CACHE_KEY, JSON.stringify({ days: get().days }));
    } catch {
      // A lost history is survivable; a failed launch is not.
    }
  },

  async hydrate() {
    try {
      const raw = await AsyncStorage.getItem(QUIZ_CACHE_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;
      const stored = (parsed as Record<string, unknown>).days;
      if (!stored || typeof stored !== 'object') return;
      const days: Record<number, boolean[]> = {};
      for (const [key, value] of Object.entries(stored as Record<string, unknown>)) {
        const day = Number(key);
        // A day whose row is not entirely booleans is dropped rather than
        // partially trusted: a half-valid score is worse than none.
        if (!Number.isFinite(day) || !Array.isArray(value)) continue;
        if (!value.every((v) => typeof v === 'boolean')) continue;
        days[day] = value as boolean[];
      }
      set({ days });
    } catch {
      // Unreadable storage starts empty rather than preventing launch.
    }
  },
}));
