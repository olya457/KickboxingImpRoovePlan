import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { HUE, RADIUS, scale } from '../palette/tokens';

const CrownButton: React.FC<{
  label: string;
  onPress: () => void;
  tone?: 'amber' | 'ghost' | 'violet';
  disabled?: boolean;
  busy?: boolean;
  style?: ViewStyle;
}> = ({ label, onPress, tone = 'amber', disabled, busy, style }) => {
  const palette =
    tone === 'amber'
      ? { bg: HUE.amber, fg: HUE.abyss }
      : tone === 'violet'
      ? { bg: HUE.violet, fg: HUE.ink }
      : { bg: HUE.panelSoft, fg: HUE.mist };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || busy}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={[
        styles.base,
        { backgroundColor: palette.bg },
        (disabled || busy) && styles.mute,
        style,
      ]}
    >
      {busy ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: scale(54, 48),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    alignSelf: 'stretch',
  },
  mute: { opacity: 0.45 },
  label: {
    fontSize: scale(16, 15),
    fontWeight: '700',
  },
});

export default CrownButton;
