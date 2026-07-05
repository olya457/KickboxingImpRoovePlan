import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StageCanvas from '../../widgets/StageCanvas';
import CrestHeader from '../../widgets/CrestHeader';
import { READS_LIBRARY } from '../../ledger/readsLibrary';
import { READ_ART } from '../../ledger/assetAtlas';
import { CANVAS, HUE, SPACE, scale } from '../../palette/tokens';
import { useKeepsake } from '../../vault/KeepsakeStore';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { broadcast } from '../../widgets/shareKit';

const ReadsDetailStage: React.FC = () => {
  const { frame, pop } = useFlow();
  const keepsake = useKeepsake();
  const read = READS_LIBRARY.find(r => r.id === frame.params?.id) ?? READS_LIBRARY[0];

  return (
    <StageCanvas>
      <CrestHeader
        title="Article"
        onBack={pop}
        saved={keepsake.isReadSaved(read.id)}
        onToggleSave={() => keepsake.toggleRead(read.id)}
        onShare={() => broadcast(read.title, read.blurb)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scroll}
      >
        <Image source={READ_ART[read.art]} style={styles.hero} resizeMode="cover" />
        <View style={styles.pad}>
          <Text style={styles.title}>{read.title}</Text>
          <Text style={styles.blurb}>{read.blurb}</Text>
          {read.paragraphs.map((p, i) => (
            <Text key={i} style={styles.para}>
              {p}
            </Text>
          ))}
        </View>
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingBottom: 40 },
  hero: { width: CANVAS.width, height: CANVAS.width },
  pad: { padding: SPACE.lg },
  title: { color: HUE.ink, fontSize: scale(24, 21), fontWeight: '900' },
  blurb: { color: HUE.amber, fontSize: scale(14, 13), fontWeight: '600', marginTop: 6 },
  para: {
    color: HUE.mist,
    fontSize: scale(15, 14),
    lineHeight: scale(24, 22),
    marginTop: 16,
  },
});

export default ReadsDetailStage;
