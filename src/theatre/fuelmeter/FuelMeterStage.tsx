import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import CrownButton from '../../widgets/CrownButton';
import EmberGauge, { gaugeTone } from '../../widgets/EmberGauge';
import { CALORIE_GOALS } from '../../ledger/programVault';
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useFuelLog, MealSlot } from '../../vault/FuelLog';
import { usePlanLedger } from '../../vault/PlanLedger';
import { useTierGate } from '../../vault/TierGate';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { DOCK } from '../../navigation/routePaths';

const MEALS: { slot: MealSlot; label: string; glyph: string }[] = [
  { slot: 'breakfast', label: 'Breakfast', glyph: '🍳' },
  { slot: 'lunch', label: 'Lunch', glyph: '🥗' },
  { slot: 'dinner', label: 'Dinner', glyph: '🍲' },
];

const FuelMeterStage: React.FC = () => {
  const clearance = useDockClearance();
  const fuel = useFuelLog();
  const ledger = usePlanLedger();
  const { premium } = useTierGate();
  const { jumpToTab } = useFlow();

  const effectiveGoal =
    fuel.goalKcal ?? (ledger.hasPlan ? ledger.program!.calories : null);

  const ratio = effectiveGoal ? fuel.total / effectiveGoal : 0;
  const over = !!effectiveGoal && fuel.total > effectiveGoal;

  const finish = () => {
    if (!effectiveGoal) return;
    const diff = fuel.total - effectiveGoal;
    const msg =
      Math.abs(diff) <= 50
        ? `Great balance! You hit your target of ${effectiveGoal} kcal.`
        : diff > 0
        ? `You went over by ${diff} kcal today. Aim a little lighter tomorrow.`
        : `You are under by ${Math.abs(diff)} kcal. Add a snack to reach your target.`;
    Alert.alert("Today's Fuel", msg);
  };

  return (
    <StageCanvas>
      <CresetTitle title="Calories" caption="Track your daily fuel" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        {!ledger.hasPlan && (
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>Get a precise calorie target</Text>
            <Text style={styles.noticeBody}>
              Complete the personalization questionnaire for a calorie norm tailored to
              your goal and training level.
            </Text>
            <CrownButton
              label="Go to Personalization"
              tone="violet"
              onPress={() => jumpToTab(DOCK.blueprint)}
              style={styles.noticeBtn}
            />
          </View>
        )}

        <Text style={styles.sectionHead}>YOUR GOAL</Text>
        <View style={styles.goalWrap}>
          {CALORIE_GOALS.map(goal => {
            const on = (fuel.goalId ?? '') === goal.id;
            return (
              <TouchableOpacity
                key={goal.id}
                activeOpacity={0.85}
                onPress={() => fuel.setGoal(goal.id, goal.kcal)}
                style={[styles.goalCard, on && styles.goalCardOn]}
              >
                <Text style={[styles.goalLabel, on && styles.goalLabelOn]}>
                  {goal.label}
                </Text>
                <Text style={styles.goalKcal}>{goal.kcal} kcal</Text>
                <Text style={styles.goalHint}>{goal.hint}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {effectiveGoal && (
          <>
            <View style={styles.progressCard}>
              <View style={styles.progressTop}>
                <Text style={styles.progressTotal}>{fuel.total}</Text>
                <Text style={styles.progressGoal}> / {effectiveGoal} kcal</Text>
              </View>
              <EmberGauge ratio={ratio} />
              <Text style={[styles.progressNote, { color: gaugeTone(ratio) }]}>
                {over
                  ? `${fuel.total - effectiveGoal} kcal over target`
                  : `${effectiveGoal - fuel.total} kcal remaining`}
              </Text>
            </View>

            {MEALS.map(meal => (
              <View key={meal.slot} style={styles.mealRow}>
                <Text style={styles.mealGlyph}>{meal.glyph}</Text>
                <Text style={styles.mealLabel}>{meal.label}</Text>
                <TextInput
                  style={styles.mealInput}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={HUE.ghost}
                  value={fuel.meals[meal.slot] ? String(fuel.meals[meal.slot]) : ''}
                  onChangeText={t =>
                    fuel.logMeal(meal.slot, Math.max(0, parseInt(t || '0', 10) || 0))
                  }
                />
                <Text style={styles.mealUnit}>kcal</Text>
              </View>
            ))}

            <CrownButton label="Finish Day" onPress={finish} style={styles.finish} />

            <View style={styles.histBlock}>
              <Text style={styles.sectionHead}>HISTORY</Text>
              {!premium ? (
                <View style={styles.histLock}>
                  <Text style={styles.histLockTxt}>
                    🔒 Calorie history is a Premium feature. Free tracking covers today
                    only.
                  </Text>
                  <CrownButton
                    label="Unlock History"
                    onPress={() => jumpToTab(DOCK.tier)}
                    style={styles.noticeBtn}
                  />
                </View>
              ) : fuel.history.length === 0 ? (
                <Text style={styles.histEmpty}>
                  Your finished days will appear here.
                </Text>
              ) : (
                fuel.history.map(h => (
                  <View key={h.day} style={styles.histRow}>
                    <Text style={styles.histDay}>{h.day}</Text>
                    <Text style={styles.histVal}>
                      {h.total} / {h.goal} kcal
                    </Text>
                  </View>
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  notice: {
    backgroundColor: HUE.panel,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.violet,
    padding: SPACE.md,
    marginBottom: SPACE.md,
  },
  noticeTitle: { color: HUE.ink, fontSize: scale(16, 15), fontWeight: '800' },
  noticeBody: { color: HUE.mist, fontSize: 13, lineHeight: 20, marginTop: 6 },
  noticeBtn: { marginTop: 12 },
  sectionHead: {
    color: HUE.ghost,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
  },
  goalWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: '48%',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginBottom: 12,
  },
  goalCardOn: { borderColor: HUE.amber, backgroundColor: HUE.panelSoft },
  goalLabel: { color: HUE.mist, fontSize: scale(15, 14), fontWeight: '800' },
  goalLabelOn: { color: HUE.ink },
  goalKcal: { color: HUE.amber, fontSize: 13, fontWeight: '700', marginTop: 4 },
  goalHint: { color: HUE.ghost, fontSize: 11, lineHeight: 15, marginTop: 6 },
  progressCard: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginTop: 4,
    marginBottom: SPACE.md,
  },
  progressTop: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 12 },
  progressTotal: { color: HUE.ink, fontSize: scale(30, 26), fontWeight: '900' },
  progressGoal: { color: HUE.mist, fontSize: 15, fontWeight: '600' },
  progressNote: { color: HUE.mist, fontSize: 13, marginTop: 10, fontWeight: '600' },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    paddingHorizontal: SPACE.md,
    paddingVertical: 6,
    marginBottom: 12,
  },
  mealGlyph: { fontSize: 20, marginRight: 10 },
  mealLabel: { color: HUE.ink, fontSize: scale(15, 14), fontWeight: '700', flex: 1 },
  mealInput: {
    minWidth: 64,
    textAlign: 'right',
    color: HUE.amber,
    fontSize: scale(17, 16),
    fontWeight: '800',
    paddingVertical: 10,
  },
  mealUnit: { color: HUE.ghost, fontSize: 12, marginLeft: 6 },
  finish: { marginTop: 4 },
  histBlock: { marginTop: SPACE.lg },
  histLock: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
  },
  histLockTxt: { color: HUE.mist, fontSize: 13, lineHeight: 20 },
  histEmpty: { color: HUE.ghost, fontSize: 13 },
  histRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: 14,
    marginBottom: 10,
  },
  histDay: { color: HUE.mist, fontSize: 13 },
  histVal: { color: HUE.ink, fontSize: 13, fontWeight: '700' },
});

export default FuelMeterStage;
