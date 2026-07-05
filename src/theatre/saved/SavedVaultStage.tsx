import React, { useState } from 'react';
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
import { DRILL_ROSTER } from '../../ledger/drillRoster';
import { READS_LIBRARY } from '../../ledger/readsLibrary';
import { DRILL_ART, READ_ART } from '../../ledger/assetAtlas';
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useKeepsake } from '../../vault/KeepsakeStore';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { FLOW } from '../../navigation/routePaths';

type Leaf = 'drills' | 'reads';

const SavedVaultStage: React.FC = () => {
  const clearance = useDockClearance();
  const keepsake = useKeepsake();
  const { push } = useFlow();
  const [leaf, setLeaf] = useState<Leaf>('drills');

  const drills = DRILL_ROSTER.filter(d => keepsake.savedDrills.includes(d.id));
  const reads = READS_LIBRARY.filter(r => keepsake.savedReads.includes(r.id));

  return (
    <StageCanvas>
      <CresetTitle title="Favorites" caption="Your saved collection" />
      <View style={styles.tabs}>
        {(['drills', 'reads'] as Leaf[]).map(l => {
          const on = leaf === l;
          return (
            <TouchableOpacity
              key={l}
              activeOpacity={0.85}
              onPress={() => setLeaf(l)}
              style={[styles.tab, on && styles.tabOn]}
            >
              <Text style={[styles.tabTxt, on && styles.tabTxtOn]}>
                {l === 'drills' ? `Exercises (${drills.length})` : `Articles (${reads.length})`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        {leaf === 'drills' ? (
          drills.length === 0 ? (
            <Empty glyph="🥊" text="No saved exercises yet. Tap Save on any drill." />
          ) : (
            drills.map(d => (
              <TouchableOpacity
                key={d.id}
                activeOpacity={0.85}
                style={styles.row}
                onPress={() => push(FLOW.drillDetail, { id: d.id })}
              >
                <Image source={DRILL_ART[d.art]} style={styles.thumb} />
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle}>{d.title}</Text>
                  <RankChip tier={d.tier} />
                </View>
                <TouchableOpacity
                  hitSlop={hit}
                  onPress={() => keepsake.toggleDrill(d.id)}
                >
                  <Text style={styles.heart}>💛</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          )
        ) : reads.length === 0 ? (
          <Empty glyph="📖" text="No saved articles yet. Tap Save on any read." />
        ) : (
          reads.map(r => (
            <TouchableOpacity
              key={r.id}
              activeOpacity={0.85}
              style={styles.row}
              onPress={() => push(FLOW.readDetail, { id: r.id })}
            >
              <Image source={READ_ART[r.art]} style={styles.thumb} />
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle}>{r.title}</Text>
                <Text style={styles.rowSub}>{r.blurb}</Text>
              </View>
              <TouchableOpacity hitSlop={hit} onPress={() => keepsake.toggleRead(r.id)}>
                <Text style={styles.heart}>💛</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </StageCanvas>
  );
};

const hit = { top: 12, bottom: 12, left: 12, right: 12 };

const Empty: React.FC<{ glyph: string; text: string }> = ({ glyph, text }) => (
  <View style={styles.empty}>
    <Text style={styles.emptyGlyph}>{glyph}</Text>
    <Text style={styles.emptyTxt}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginHorizontal: SPACE.lg,
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.pill,
    padding: 4,
    marginBottom: SPACE.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
  },
  tabOn: { backgroundColor: HUE.amber },
  tabTxt: { color: HUE.mist, fontSize: 13, fontWeight: '700' },
  tabTxtOn: { color: HUE.abyss, fontWeight: '800' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: 10,
    marginBottom: 12,
  },
  thumb: { width: 58, height: 58, borderRadius: RADIUS.sm, marginRight: 12 },
  rowBody: { flex: 1 },
  rowTitle: { color: HUE.ink, fontSize: scale(15, 14), fontWeight: '800', marginBottom: 6 },
  rowSub: { color: HUE.mist, fontSize: 12 },
  heart: { fontSize: 22, paddingLeft: 8 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyGlyph: { fontSize: 40 },
  emptyTxt: { color: HUE.mist, fontSize: 14, textAlign: 'center', marginTop: 12, paddingHorizontal: 30 },
});

export default SavedVaultStage;
