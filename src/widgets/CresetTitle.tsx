import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HUE, scale, SPACE } from '../palette/tokens';

const CresetTitle: React.FC<{ title: string; caption?: string }> = ({
  title,
  caption,
}) => (
  <View style={styles.wrap}>
    <Text style={styles.title}>{title}</Text>
    {!!caption && <Text style={styles.caption}>{caption}</Text>}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.md,
    paddingBottom: SPACE.sm,
  },
  title: {
    color: HUE.ink,
    fontSize: scale(28, 24),
    fontWeight: '800',
  },
  caption: {
    color: HUE.mist,
    fontSize: scale(14, 13),
    marginTop: 3,
  },
});

export default CresetTitle;
