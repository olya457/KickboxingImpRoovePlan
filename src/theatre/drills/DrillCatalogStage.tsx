import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import RankChip from '../../widgets/RankChip';
import CardActions from '../../widgets/CardActions';
import { DRILL_ROSTER, STRAND_ORDER, DrillStrand } from '../../ledger/drillRoster';
import { DRILL_ART } from '../../ledger/assetAtlas';
import { CANVAS, HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useKeepsake } from '../../vault/KeepsakeStore';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { FLOW } from '../../navigation/routePaths';
import { broadcast } from '../../widgets/shareKit';

const FILTERS: (DrillStrand | 'All')[] = ['All', ...STRAND_ORDER];

const ART_W = CANVAS.width - SPACE.lg * 2;
const ART_H = (ART_W * 295) / 300;

const DrillCatalogStage: React.FC = () => {
  const clearance = useDockClearance();
  const keepsake = useKeepsake();
  const { push } = useFlow();
  const [strand, setStrand] = useState<DrillStrand | 'All'>('All');

  const list = useMemo(
    () =>
      strand === 'All'
        ? DRILL_ROSTER
        : DRILL_ROSTER.filter(d => d.strand === strand),
    [strand],
  );

  return (
    <StageCanvas>
      <CresetTitle title="Exercises" caption="20 kickboxing drills" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map(f => {
          const on = f === strand;
          return (
            <TouchableOpacity
              key={f}
              activeOpacity={0.8}
              onPress={() => setStrand(f)}
              style={[styles.pill, on && styles.pillOn]}
            >
              <Text numberOfLines={1} style={[styles.pillTxt, on && styles.pillTxtOn]}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        {list.map(drill => (
          <View key={drill.id} style={styles.card}>
            <Image source={DRILL_ART[drill.art]} style={styles.art} resizeMode="cover" />
            <View style={styles.body}>
              <View style={styles.headRow}>
                <Text style={styles.title}>{drill.title}</Text>
                <RankChip tier={drill.tier} />
              </View>
              <Text style={styles.blurb}>{drill.blurb}</Text>
              <CardActions
                saved={keepsake.isDrillSaved(drill.id)}
                onSave={() => keepsake.toggleDrill(drill.id)}
                onShare={() => broadcast(drill.title, drill.blurb)}
                onOpen={() => push(FLOW.drillDetail, { id: drill.id })}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    paddingHorizontal: SPACE.lg,
    paddingTop: 6,
    paddingBottom: SPACE.sm,
    alignItems: 'center',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    height: 46,
    borderRadius: RADIUS.pill,
    backgroundColor: HUE.slate,
    borderWidth: 1,
    borderColor: HUE.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillOn: { backgroundColor: HUE.amber, borderColor: HUE.amber },
  pillTxt: {
    color: HUE.mist,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  pillTxtOn: { color: HUE.abyss, fontWeight: '800' },
  card: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    marginBottom: SPACE.md,
    overflow: 'hidden',
  },
  art: { width: ART_W, height: ART_H, alignSelf: 'center' },
  body: { padding: SPACE.md },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: HUE.ink,
    fontSize: scale(17, 16),
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  blurb: {
    color: HUE.mist,
    fontSize: scale(13, 12),
    lineHeight: 19,
    marginTop: 5,
  },
});

export default DrillCatalogStage;
