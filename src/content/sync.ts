/**
 * The one place that talks to content-drip for quandary's daily five.
 *
 * The bundled 155-question pool (`src/logic/daily.ts`) is never deleted and
 * never stops working — it is the fallback whenever the service is
 * unreachable, slow, or answers with something malformed. Nothing here can
 * block a player: a cache read or a network call that fails just means the
 * question set for the day is computed locally instead, exactly as it always
 * was before this file existed.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import { DAILY_COUNT, type Question, questionsFor } from "@/logic/daily";

/** Where the content service lives. Overridable for a staging build. */
export const CONTENT_BASE_URL =
  process.env.EXPO_PUBLIC_CONTENT_BASE_URL ?? "https://content.altixcode.com";

/** Short: this runs while someone is trying to play. */
const TIMEOUT_MS = 8_000;

const CACHE_PREFIX = "quandary.content.v1.";

/** UTC calendar date for a day number, matching the server's own UTC calendar. */
export function dateKeyForDay(day: number): string {
  return new Date(day * 86_400_000).toISOString().slice(0, 10);
}

function isValidQuestion(value: unknown): value is Question {
  if (!value || typeof value !== "object") return false;
  const q = value as Record<string, unknown>;
  return (
    typeof q.prompt === "string" &&
    Array.isArray(q.options) &&
    q.options.length === 4 &&
    q.options.every((o) => typeof o === "string") &&
    typeof q.answerIndex === "number" &&
    Number.isInteger(q.answerIndex) &&
    q.answerIndex >= 0 &&
    q.answerIndex < 4 &&
    typeof q.explanation === "string"
  );
}

function isValidQuestionSet(value: unknown): value is Question[] {
  return (
    Array.isArray(value) &&
    value.length === DAILY_COUNT &&
    value.every(isValidQuestion)
  );
}

async function readCache(day: number): Promise<Question[] | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + day);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidQuestionSet(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeCache(day: number, questions: Question[]): Promise<void> {
  try {
    await AsyncStorage.setItem(CACHE_PREFIX + day, JSON.stringify(questions));
  } catch {
    // A lost cache entry costs one extra fetch tomorrow. Not worth surfacing.
  }
}

/**
 * The five questions for a day: cache, then the live service, then the
 * bundled pool — the first one that actually answers. Never throws.
 */
export async function fetchQuestionsFor(day: number): Promise<Question[]> {
  const cached = await readCache(day);
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const url = `${CONTENT_BASE_URL}/api/v1/quandary/questions/today?date=${dateKeyForDay(day)}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error(`${response.status} from content-drip`);
    const body = (await response.json()) as { items?: unknown };
    if (isValidQuestionSet(body.items)) {
      void writeCache(day, body.items);
      return body.items;
    }
  } catch {
    // Network failure, timeout, or a malformed response: fall through.
  } finally {
    clearTimeout(timer);
  }
  return questionsFor(day);
}
