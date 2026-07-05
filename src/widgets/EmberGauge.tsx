import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HUE, RADIUS } from '../palette/tokens';

export const gaugeTone = (ratio: number) => {
  if (ratio >= 0.9) return HUE.danger;
  if (ratio >= 0.5) return HUE.orange;
  return HUE.mint;
};

const EmberGauge: React.FC<{ ratio: number }> = ({ ratio }) => {
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  return (
    <View style={styles.track}>
      <View
        style={[styles.fill, { width: `${pct}%`, backgroundColor: gaugeTone(ratio) }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 12,
    borderRadius: RADIUS.pill,
    backgroundColor: HUE.slate,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
});

export default EmberGauge;
