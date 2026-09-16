import Feather from '@expo/vector-icons/Feather';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BannerAdSlot } from '@/components/BannerAdSlot';
import { Button, Card, Text } from '@/components/ui';
import { t } from '@/i18n';
import {
  DAILY_COUNT,
  FREE_ARCHIVE_DAYS,
  canOpenArchive,
  dayNumber,
  isCorrect,
  questionsFor,
} from '@/logic/daily';
import { noteGameFinished } from '@/monetization/pacing';
import { usePremiumStore } from '@/store/usePremiumStore';
import { useQuizStore } from '@/store/useQuizStore';
import { MIN_TOUCH_TARGET, useTheme, withAlpha } from '@/theme';
import { useTabletColumn } from '@/theme/useTabletColumn';

/** Past days offered in the archive list. */
const ARCHIVE_SPAN = 10;

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, spacing, radius } = useTheme();
  const tabletColumn = useTabletColumn();

  const isPremium = usePremiumStore((s) => s.isPremium);
  const isReady = usePremiumStore((s) => s.isReady);
  const hydrate = useQuizStore((s) => s.hydrate);
  const answer = useQuizStore((s) => s.answer);
  const answersFor = useQuizStore((s) => s.answersFor);
  const scoreFor = useQuizStore((s) => s.scoreFor);
  const isComplete = useQuizStore((s) => s.isComplete);
  const streak = useQuizStore((s) => s.streak);

  const [today] = useState(() => dayNumber(Date.now()));
  const [day, setDay] = useState(() => dayNumber(Date.now()));
  // The question being answered, frozen while its explanation is on screen.
  //
  // Deriving the index from the answer count alone advances it the instant the
  // answer is recorded, so the explanation card would render against the NEXT
  // question while the player is still reading about this one.
  const [pending, setPending] = useState<{ index: number; choice: number } | null>(null);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const questions = questionsFor(day);
  const answers = answersFor(day);
  const index = pending ? pending.index : Math.min(answers.length, DAILY_COUNT - 1);
  const choice = pending?.choice ?? null;
  const question = questions[index]!;
  const done = isComplete(day);
  const days = streak(today);

  const pick = (option: number) => {
    if (choice !== null || done) return;
    const right = isCorrect(question, option);
    setPending({ index, choice: option });
    answer(day, index, right);
    void Haptics.notificationAsync(
      right ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning,
    );
  };

  const next = () => {
    setPending(null);
    // The interstitial goes here — between questions, never over one — and only
    // when the day is finished, so it cannot interrupt a run.
    // Only when the day's quiz is actually over, not after every question.
    if (answers.length + 1 >= DAILY_COUNT) void noteGameFinished();
  };

  const openDay = (target: number) => {
    if (!canOpenArchive(target, today, isPremium)) {
      router.push('/paywall');
      return;
    }
    setPending(null);
    setDay(target);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + spacing.base,
          paddingHorizontal: spacing.base,
          paddingBottom: spacing.xl,
          gap: spacing.base,
        
          ...tabletColumn,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <Text variant="title" style={styles.grow}>
            {t('appName')}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('settingsTitle')}
            onPress={() => router.push('/settings')}
            hitSlop={8}
            style={styles.iconSlot}
          >
            <Feather name="settings" size={20} color={colors.textMuted} />
          </Pressable>
        </View>

        <Text variant="heading">{t('todayTitle')}</Text>
        {days > 0 ? (
          <Text variant="caption" tone="muted">
            {t('streakLabel', { n: days })}
          </Text>
        ) : null}

        {done ? (
          <Card>
            <Text variant="heading">{t('doneTitle')}</Text>
            <Text variant="display">
              {t('scoreLine', { score: scoreFor(day), total: DAILY_COUNT })}
            </Text>
            <Text variant="caption" tone="muted">
              {t('comeBackTomorrow')}
            </Text>
          </Card>
        ) : (
          <>
            <Text variant="caption" tone="muted">
              {t('questionOf', { n: index + 1, total: DAILY_COUNT })}
            </Text>
            <Text variant="heading">{question.prompt}</Text>
            {question.options.map((option, i) => {
              const chosen = choice === i;
              const right = choice !== null && i === question.answerIndex;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="button"
                  accessibilityLabel={option}
                  accessibilityState={{ selected: chosen, disabled: choice !== null }}
                  onPress={() => pick(i)}
                  style={[
                    styles.option,
                    {
                      borderRadius: radius.md,
                      paddingHorizontal: spacing.base,
                      borderWidth: chosen || right ? 2 : StyleSheet.hairlineWidth,
                      borderColor: right
                        ? colors.success
                        : chosen
                          ? colors.danger
                          : colors.border,
                      backgroundColor: right
                        ? withAlpha(colors.success, 0.16)
                        : colors.surface,
                    },
                  ]}
                >
                  <Text variant="body">{option}</Text>
                </Pressable>
              );
            })}
            {choice === null ? null : (
              <Card>
                <Text variant="heading">
                  {isCorrect(question, choice) ? t('correctTitle') : t('wrongTitle')}
                </Text>
                <Text variant="caption" tone="muted">
                  {t('explanationTitle')}
                </Text>
                <Text variant="body">{question.explanation}</Text>
                <Button label={t('nextCta')} onPress={next} style={{ marginTop: spacing.sm }} />
              </Card>
            )}
          </>
        )}

        <Text variant="heading" style={{ marginTop: spacing.base }}>
          {t('archiveTitle')}
        </Text>
        <View style={[styles.chipRow, { gap: spacing.sm }]}>
          {Array.from({ length: ARCHIVE_SPAN }, (_, i) => today - i).map((target) => {
            const allowed = canOpenArchive(target, today, isPremium);
            const label = target === today ? t('todayTitle') : `-${today - target}`;
            const chosen = target === day;
            return (
              <Pressable
                key={target}
                accessibilityRole="button"
                accessibilityLabel={allowed ? label : t('dayLocked')}
                accessibilityState={{ selected: chosen, disabled: !allowed }}
                onPress={() => openDay(target)}
                style={[
                  styles.chip,
                  {
                    borderRadius: radius.full,
                    paddingHorizontal: spacing.base,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: chosen ? colors.accent : colors.border,
                    backgroundColor: chosen ? withAlpha(colors.accent, 0.16) : colors.surface,
                  },
                ]}
              >
                {/* Full contrast whether locked or not: the lock icon and the
                    accessibility label carry the state, not a dimmed label. */}
                <Text variant="body">{label}</Text>
                {allowed ? null : <Feather name="lock" size={14} color={colors.textMuted} />}
              </Pressable>
            );
          })}
        </View>
        {isPremium ? null : (
          <Text variant="caption" tone="muted">
            {t('archiveLocked', { n: FREE_ARCHIVE_DAYS })}
          </Text>
        )}
      </ScrollView>
      <BannerAdSlot />
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  grow: { flex: 1 },
  iconSlot: {
    minWidth: MIN_TOUCH_TARGET,
    minHeight: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: { minHeight: MIN_TOUCH_TARGET, justifyContent: 'center' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: MIN_TOUCH_TARGET },
});
