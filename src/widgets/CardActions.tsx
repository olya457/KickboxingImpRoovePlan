import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HUE, RADIUS } from '../palette/tokens';

const CardActions: React.FC<{
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onOpen: () => void;
}> = ({ saved, onSave, onShare, onOpen }) => (
  <View style={styles.row}>
    <TouchableOpacity style={styles.soft} activeOpacity={0.8} onPress={onSave}>
      <Text style={styles.softTxt}>{saved ? '💛 Saved' : '🤍 Save'}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.soft} activeOpacity={0.8} onPress={onShare}>
      <Text style={styles.softTxt}>↗ Share</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.open} activeOpacity={0.85} onPress={onOpen}>
      <Text style={styles.openTxt}>Open ›</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  soft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: HUE.outline,
    marginRight: 8,
  },
  softTxt: { color: HUE.mist, fontSize: 12, fontWeight: '600' },
  open: {
    marginLeft: 'auto',
    backgroundColor: HUE.amber,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: RADIUS.pill,
  },
  openTxt: { color: HUE.abyss, fontSize: 13, fontWeight: '800' },
});

export default CardActions;
