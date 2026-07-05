import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HUE, scale } from '../palette/tokens';

const CrestHeader: React.FC<{
  title: string;
  onBack: () => void;
  saved?: boolean;
  onToggleSave?: () => void;
  onShare?: () => void;
}> = ({ title, onBack, saved, onToggleSave, onShare }) => (
  <View style={styles.bar}>
    <TouchableOpacity onPress={onBack} hitSlop={h} style={styles.side}>
      <Text style={styles.arrow}>‹</Text>
    </TouchableOpacity>
    <Text style={styles.title} numberOfLines={1}>
      {title}
    </Text>
    <View style={styles.actions}>
      {onToggleSave && (
        <TouchableOpacity onPress={onToggleSave} hitSlop={h} style={styles.icoBtn}>
          <Text style={styles.ico}>{saved ? '💛' : '🤍'}</Text>
        </TouchableOpacity>
      )}
      {onShare && (
        <TouchableOpacity onPress={onShare} hitSlop={h} style={styles.icoBtn}>
          <Text style={styles.ico}>↗</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const h = { top: 10, bottom: 10, left: 10, right: 10 };

const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: HUE.midnight,
  },
  side: { width: 34 },
  arrow: { color: HUE.ink, fontSize: 34, marginTop: -6, fontWeight: '300' },
  title: {
    flex: 1,
    color: HUE.ink,
    fontSize: scale(19, 17),
    fontWeight: '800',
  },
  actions: { flexDirection: 'row', alignItems: 'center' },
  icoBtn: { paddingHorizontal: 6 },
  ico: { fontSize: 20 },
});

export default CrestHeader;
