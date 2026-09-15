import {
  DAILY_COUNT,
  FREE_ARCHIVE_DAYS,
  QUESTIONS,
  canOpenArchive,
  dayNumber,
  isCorrect,
  questionsFor,
  scoreDay,
  streakFrom,
} from '../daily';

describe('the question bank', () => {
  it('has enough that a day never repeats within a season', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(DAILY_COUNT * 30);
  });

  it('gives every question exactly one correct option, and at least three to choose from', () => {
    for (const q of QUESTIONS) {
      expect(q.options.length).toBeGreaterThanOrEqual(3);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(q.options.length);
    }
  });

  it('explains every answer, because a question you got wrong is the useful one', () => {
    for (const q of QUESTIONS) {
      expect(q.explanation.trim().length).toBeGreaterThan(20);
    }
  });

  it('has no duplicate ids', () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
  });

  it('has no duplicate prompts', () => {
    expect(new Set(QUESTIONS.map((q) => q.prompt)).size).toBe(QUESTIONS.length);
  });

  it('never repeats an option within a question', () => {
    for (const q of QUESTIONS) {
      expect(new Set(q.options).size).toBe(q.options.length);
    }
  });
});

describe("the day's five", () => {
  it('gives everyone the same five for a day', () => {
    const a = questionsFor(dayNumber(Date.UTC(2026, 8, 15)));
    const b = questionsFor(dayNumber(Date.UTC(2026, 8, 15)));
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  it('is five', () => {
    expect(questionsFor(1)).toHaveLength(DAILY_COUNT);
    expect(DAILY_COUNT).toBe(5);
  });

  it('differs from day to day', () => {
    const a = questionsFor(100).map((q) => q.id);
    const b = questionsFor(101).map((q) => q.id);
    expect(a).not.toEqual(b);
  });

  it('never repeats a question within the same day', () => {
    for (let day = 0; day < 120; day += 1) {
      const ids = questionsFor(day).map((q) => q.id);
      expect(new Set(ids).size).toBe(DAILY_COUNT);
    }
  });
});

describe('answering', () => {
  it('knows a right answer from a wrong one', () => {
    const q = QUESTIONS[0]!;
    expect(isCorrect(q, q.answerIndex)).toBe(true);
    expect(isCorrect(q, (q.answerIndex + 1) % q.options.length)).toBe(false);
  });

  it('treats an out-of-range choice as wrong rather than throwing', () => {
    expect(isCorrect(QUESTIONS[0]!, 99)).toBe(false);
    expect(isCorrect(QUESTIONS[0]!, -1)).toBe(false);
  });
});

describe('scoring a day', () => {
  it('counts the correct answers', () => {
    expect(scoreDay([true, false, true, true, false])).toBe(3);
  });

  it('is zero for an unplayed day', () => {
    expect(scoreDay([])).toBe(0);
  });
});

describe('streaks', () => {
  it('counts consecutive days back from today', () => {
    expect(streakFrom([10, 9, 8], 10)).toBe(3);
  });

  it('stops at a gap', () => {
    expect(streakFrom([10, 8, 7], 10)).toBe(1);
  });

  it('is zero when today is unplayed', () => {
    expect(streakFrom([9, 8], 10)).toBe(0);
  });

  it('does not care about order or duplicates in the stored days', () => {
    expect(streakFrom([8, 10, 9, 9], 10)).toBe(3);
  });
});

describe('the archive', () => {
  it('lets a free player back a few days and a paid one back to the start', () => {
    expect(canOpenArchive(100, 100, false)).toBe(true);
    expect(canOpenArchive(100 - FREE_ARCHIVE_DAYS + 1, 100, false)).toBe(true);
    expect(canOpenArchive(100 - FREE_ARCHIVE_DAYS, 100, false)).toBe(false);
    expect(canOpenArchive(1, 100, true)).toBe(true);
  });

  it('never opens a day that has not happened', () => {
    expect(canOpenArchive(101, 100, true)).toBe(false);
  });
});
