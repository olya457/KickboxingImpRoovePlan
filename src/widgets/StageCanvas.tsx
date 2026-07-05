import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useCanvasInsets } from '../vault/EdgeInsetKeeper';
import { HUE } from '../palette/tokens';

export const useDockClearance = () => {
  const insets = useCanvasInsets();
  return insets.bottom + insets.dockGap + 78;
};

const StageCanvas: React.FC<{
  children: React.ReactNode;
  topPad?: boolean;
  style?: ViewStyle;
}> = ({ children, topPad = true, style }) => {
  const insets = useCanvasInsets();
  return (
    <View
      style={[
        styles.canvas,
        topPad && { paddingTop: insets.top },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: HUE.abyss,
  },
});

export default StageCanvas;
