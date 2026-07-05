import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import CardActions from '../../widgets/CardActions';
import { READS_LIBRARY, FREE_READ_COUNT } from '../../ledger/readsLibrary';
import { READ_ART } from '../../ledger/assetAtlas';
import { CANVAS, HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useKeepsake } from '../../vault/KeepsakeStore';
import { useTierGate } from '../../vault/TierGate';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { FLOW, DOCK } from '../../navigation/routePaths';
import { broadcast } from '../../widgets/shareKit';

const ART_SIZE = CANVAS.width - SPACE.lg * 2;

const ReadsShelfStage: React.FC = () => {
  const clearance = useDockClearance();
  const keepsake = useKeepsake();
  const { premium } = useTierGate();
  const { push, jumpToTab } = useFlow();

  return (
    <StageCanvas>
      <CresetTitle title="Articles" caption="12 training reads" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        {READS_LIBRARY.map((read, i) => {
          const locked = !premium && i >= FREE_READ_COUNT;
          return (
            <View key={read.id} style={styles.card}>
              <View>
                <Image source={READ_ART[read.art]} style={styles.art} resizeMode="cover" />
                {locked && (
                  <View style={styles.lockTag}>
                    <Text style={styles.lockTagTxt}>🔒 Premium</Text>
                  </View>
                )}
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>{read.title}</Text>
                <Text style={styles.blurb}>{read.blurb}</Text>
                <CardActions
                  saved={keepsake.isReadSaved(read.id)}
                  onSave={() => keepsake.toggleRead(read.id)}
                  onShare={() => broadcast(read.title, read.blurb)}
                  onOpen={() =>
                    locked
                      ? jumpToTab(DOCK.tier)
                      : push(FLOW.readDetail, { id: read.id })
                  }
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    marginBottom: SPACE.md,
    overflow: 'hidden',
  },
  art: { width: ART_SIZE, height: ART_SIZE, alignSelf: 'center' },
  lockTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15,12,40,0.85)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  lockTagTxt: { color: HUE.amber, fontSize: 12, fontWeight: '700' },
  body: { padding: SPACE.md },
  title: { color: HUE.ink, fontSize: scale(17, 16), fontWeight: '800' },
  blurb: { color: HUE.mist, fontSize: scale(13, 12), marginTop: 5 },
});

export default ReadsShelfStage;
