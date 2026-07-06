import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
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
    <Pressable
      collapsable={false}
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: palette.bg },
        (disabled || busy) && styles.mute,
        pressed && styles.pressed,
        style,
      ]}
    >
      {busy ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <Text style={[styles.label, { color: palette.fg }]}>{label}</Text>
      )}
    </Pressable>
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
    width: '100%',
  },
  mute: { opacity: 0.45 },
  pressed: { opacity: 0.85 },
  label: {
    fontSize: scale(16, 15),
    fontWeight: '700',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

export default CrownButton;
