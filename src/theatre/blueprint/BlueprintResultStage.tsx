import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import CrownButton from '../../widgets/CrownButton';
import { DRILL_ROSTER } from '../../ledger/drillRoster';
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { usePlanLedger } from '../../vault/PlanLedger';
import { useTierGate } from '../../vault/TierGate';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { DOCK } from '../../navigation/routePaths';

const loadFor = (name: string) => {
  const drill = DRILL_ROSTER.find(d => d.title === name);
  return drill ? drill.loads.beginner : null;
};

const BlueprintResultStage: React.FC = () => {
  const clearance = useDockClearance();
  const ledger = usePlanLedger();
  const { premium } = useTierGate();
  const { jumpToTab } = useFlow();
  const program = ledger.program!;

  const restCount = program.week.filter(d => d.rest).length;
  const today = program.week.find(d => !d.rest) ?? program.week[0];

  const tiles = [
    { glyph: '🔥', label: 'DAILY CALORIES', value: `${program.calories.toLocaleString()} kcal` },
    { glyph: '💧', label: 'WATER GOAL', value: `${program.water} / day` },
    { glyph: '🌙', label: 'SLEEP TARGET', value: `${program.sleep} / night` },
    { glyph: '🛌', label: 'REST DAYS', value: `${restCount}× per week` },
  ];

  return (
    <StageCanvas>
      <CresetTitle title="Your Plan Is Ready" caption="Based on your answers" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{program.title}</Text>
          <Text style={styles.heroBody}>
            Based on your answers, we prepared a focused training plan with exercises,
            calorie target, water goal, sleep recommendation, and recovery days.
          </Text>
          <View style={styles.focusRow}>
            {program.focus.map(f => (
              <View key={f} style={styles.focusChip}>
                <Text style={styles.focusTxt}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.tileGrid}>
          {tiles.map(t => (
            <View key={t.label} style={styles.tile}>
              <Text style={styles.tileGlyph}>{t.glyph}</Text>
              <Text style={styles.tileLabel}>{t.label}</Text>
              <Text style={styles.tileValue}>{t.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockHead}>TODAY'S PLAN</Text>
          {today.moves.map(move => {
            const load = loadFor(move);
            return (
              <Text key={move} style={styles.moveLine}>
                • {move}
                {load ? <Text style={styles.moveLoad}>{`  —  ${load}`}</Text> : null}
              </Text>
            );
          })}
        </View>

        <View style={styles.block}>
          <Text style={styles.blockHead}>30-DAY CALENDAR</Text>
          <View style={styles.calGrid}>
            {Array.from({ length: 30 }).map((_, i) => {
              const dayPlan = program.week[i % 7];
              const rest = dayPlan.rest;
              return (
                <View
                  key={i}
                  style={[
                    styles.cell,
                    premium && (rest ? styles.cellRest : styles.cellWork),
                  ]}
                >
                  <Text style={[styles.cellTxt, !premium && styles.cellMuted]}>
                    {i + 1}
                  </Text>
                </View>
              );
            })}
          </View>
          {!premium && (
            <View style={styles.lockVeil}>
              <Text style={styles.lockGlyph}>🔒</Text>
              <Text style={styles.lockTitle}>30-Day Plan Locked</Text>
              <Text style={styles.lockSub}>
                Upgrade to access your full training calendar
              </Text>
              <CrownButton
                label="Get Premium"
                onPress={() => jumpToTab(DOCK.tier)}
                style={styles.lockBtn}
              />
            </View>
          )}
        </View>

        {!premium && (
          <View style={styles.upsell}>
            <Text style={styles.upsellTitle}>Unlock the Full 30-Day Plan</Text>
            <Text style={styles.upsellBody}>
              Get daily exercises, rest days, and weekly goals for a full month of
              structured training.
            </Text>
            <CrownButton label="Get Premium" onPress={() => jumpToTab(DOCK.tier)} />
          </View>
        )}

        <CrownButton
          label="Retake Questionnaire"
          tone="ghost"
          onPress={ledger.resetPlan}
          style={styles.retake}
        />
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  hero: {
    backgroundColor: HUE.panel,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
  },
  heroTitle: { color: HUE.ink, fontSize: scale(20, 18), fontWeight: '900' },
  heroBody: {
    color: HUE.mist,
    fontSize: scale(13, 12),
    lineHeight: 20,
    marginTop: 8,
  },
  focusRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 8 },
  focusChip: {
    backgroundColor: HUE.slate,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  focusTxt: { color: HUE.violetSoft, fontSize: 12, fontWeight: '700' },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACE.md,
  },
  tile: {
    width: '48%',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginBottom: 12,
  },
  tileGlyph: { fontSize: 20 },
  tileLabel: {
    color: HUE.ghost,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginTop: 8,
  },
  tileValue: { color: HUE.ink, fontSize: scale(16, 15), fontWeight: '800', marginTop: 3 },
  block: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginTop: 4,
    marginBottom: SPACE.md,
    overflow: 'hidden',
  },
  blockHead: {
    color: HUE.ghost,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
  },
  moveLine: { color: HUE.ink, fontSize: scale(14, 13), marginBottom: 8 },
  moveLoad: { color: HUE.mist },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  cell: {
    width: '12.7%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: HUE.slate,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellWork: { backgroundColor: HUE.panelSoft, borderWidth: 1, borderColor: HUE.outline },
  cellRest: { backgroundColor: 'rgba(244,198,75,0.14)' },
  cellTxt: { color: HUE.ink, fontSize: 12, fontWeight: '700' },
  cellMuted: { color: HUE.ghost, opacity: 0.4 },
  lockVeil: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 40,
    backgroundColor: 'rgba(20,16,50,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACE.md,
  },
  lockGlyph: { fontSize: 26 },
  lockTitle: { color: HUE.ink, fontSize: 16, fontWeight: '800', marginTop: 6 },
  lockSub: { color: HUE.mist, fontSize: 12, textAlign: 'center', marginTop: 4 },
  lockBtn: { marginTop: 12, alignSelf: 'stretch' },
  upsell: {
    backgroundColor: HUE.panel,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginBottom: SPACE.md,
  },
  upsellTitle: { color: HUE.ink, fontSize: scale(16, 15), fontWeight: '800' },
  upsellBody: { color: HUE.mist, fontSize: 13, lineHeight: 20, marginVertical: 8 },
  retake: { marginBottom: SPACE.md },
});

export default BlueprintResultStage;
