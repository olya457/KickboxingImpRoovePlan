import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tier } from '../ledger/drillRoster';
import { HUE, RADIUS } from '../palette/tokens';

const TONE: Record<Tier, { bg: string; fg: string }> = {
  Beginner: { bg: 'rgba(95,212,138,0.18)', fg: HUE.mint },
  Intermediate: { bg: 'rgba(244,198,75,0.18)', fg: HUE.amber },
  Advanced: { bg: 'rgba(240,103,103,0.18)', fg: HUE.danger },
};

const RankChip: React.FC<{ tier: Tier }> = ({ tier }) => {
  const tone = TONE[tier];
  return (
    <View style={[styles.chip, { backgroundColor: tone.bg }]}>
      <Text style={[styles.text, { color: tone.fg }]}>{tier}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default RankChip;
