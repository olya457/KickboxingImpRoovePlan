import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StageCanvas from '../../widgets/StageCanvas';
import CrestHeader from '../../widgets/CrestHeader';
import RankChip from '../../widgets/RankChip';
import { DRILL_ROSTER } from '../../ledger/drillRoster';
import { DRILL_ART } from '../../ledger/assetAtlas';
import { CANVAS, HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useKeepsake } from '../../vault/KeepsakeStore';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { broadcast } from '../../widgets/shareKit';

const HERO_H = (CANVAS.width * 295) / 300;

const DrillDetailStage: React.FC = () => {
  const { frame, pop } = useFlow();
  const keepsake = useKeepsake();
  const drill = DRILL_ROSTER.find(d => d.id === frame.params?.id) ?? DRILL_ROSTER[0];

  const loads = [
    { tier: 'Beginner', value: drill.loads.beginner, hot: true },
    { tier: 'Intermediate', value: drill.loads.intermediate, hot: false },
    { tier: 'Advanced', value: drill.loads.advanced, hot: false },
  ];

  return (
    <StageCanvas>
      <CrestHeader
        title="Exercise Details"
        onBack={pop}
        saved={keepsake.isDrillSaved(drill.id)}
        onToggleSave={() => keepsake.toggleDrill(drill.id)}
        onShare={() => broadcast(drill.title, drill.blurb)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <Image source={DRILL_ART[drill.art]} style={styles.hero} resizeMode="cover" />

        <View style={styles.pad}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{drill.title}</Text>
            <RankChip tier={drill.tier} />
          </View>
          <Text style={styles.detail}>{drill.detail}</Text>

          <View style={styles.block}>
            <Text style={styles.blockHead}>TECHNIQUE TIPS</Text>
            {drill.cues.map((cue, i) => (
              <View key={i} style={styles.cueRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeTxt}>{i + 1}</Text>
                </View>
                <Text style={styles.cue}>{cue}</Text>
              </View>
            ))}
          </View>

          <View style={styles.block}>
            <Text style={styles.blockHead}>RECOMMENDED SETS</Text>
            {loads.map(row => (
              <View
                key={row.tier}
                style={[styles.loadRow, row.hot ? styles.loadHot : styles.loadCold]}
              >
                <Text style={[styles.loadTier, row.hot && styles.loadTierHot]}>
                  {row.tier}
                </Text>
                <Text style={[styles.loadVal, row.hot && styles.loadTierHot]}>
                  {row.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  hero: { width: CANVAS.width, height: HERO_H },
  pad: { padding: SPACE.lg },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { color: HUE.ink, fontSize: scale(24, 21), fontWeight: '900', flex: 1, marginRight: 10 },
  detail: {
    color: HUE.mist,
    fontSize: scale(15, 14),
    lineHeight: scale(23, 21),
    marginTop: 12,
  },
  block: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginTop: SPACE.md,
  },
  blockHead: {
    color: HUE.ghost,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cueRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: HUE.amber,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  badgeTxt: { color: HUE.abyss, fontWeight: '800', fontSize: 13 },
  cue: { color: HUE.ink, fontSize: scale(14, 13), lineHeight: 20, flex: 1 },
  loadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    marginBottom: 10,
  },
  loadHot: { backgroundColor: HUE.amber },
  loadCold: { backgroundColor: HUE.slate },
  loadTier: { color: HUE.mist, fontSize: 14, fontWeight: '700' },
  loadVal: { color: HUE.mist, fontSize: 14, fontWeight: '800' },
  loadTierHot: { color: HUE.abyss },
});

export default DrillDetailStage;
