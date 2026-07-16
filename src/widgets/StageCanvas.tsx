import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useCanvasInsets } from '../vault/EdgeInsetKeeper';
import { HUE } from '../palette/tokens';

export const useDockClearance = () => {
  const insets = useCanvasInsets();
  return insets.bottom + insets.dockGap + 78;
};

const StageCanvas: React.FC<{
  children: React.ReactNode;
  topPad?: boolean;
  style?: StyleProp<ViewStyle>;
}> = ({ children, topPad = true, style }) => {
  const insets = useCanvasInsets();
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.timing(reveal, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });

    animation.start();
    return () => animation.stop();
  }, [reveal]);

  return (
    <Animated.View
      style={[
        styles.canvas,
        topPad && { paddingTop: insets.top },
        {
          opacity: reveal,
          transform: [
            {
              translateY: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
              }),
            },
            {
              scale: reveal.interpolate({
                inputRange: [0, 1],
                outputRange: [0.985, 1],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: HUE.abyss,
  },
});

export default StageCanvas;
