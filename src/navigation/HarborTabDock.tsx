import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DOCK_ITEMS } from './routePaths';
import { useFlow } from './FlowOrchestrator';
import { useCanvasInsets } from '../vault/EdgeInsetKeeper';
import { HUE, RADIUS, scale } from '../palette/tokens';

const HarborTabDock: React.FC = () => {
  const { tab, goTab } = useFlow();
  const insets = useCanvasInsets();

  return (
    <View
      pointerEvents="box-none"
      style={[styles.hull, { bottom: insets.rawBottom + insets.dockGap }]}
    >
      <View style={styles.dock}>
        {DOCK_ITEMS.map(item => {
          const on = tab === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              activeOpacity={0.8}
              style={styles.slot}
              onPress={() => goTab(item.key)}
            >
              <View style={[styles.halo, on && styles.haloOn]}>
                <Text style={[styles.glyph, !on && styles.glyphDim]}>
                  {item.glyph}
                </Text>
              </View>
              <Text style={[styles.tag, on && styles.tagOn]} numberOfLines={1}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hull: {
    position: 'absolute',
    left: scale(14, 8),
    right: scale(14, 8),
    alignItems: 'center',
  },
  dock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(36,30,82,0.96)',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.glassLine,
    paddingVertical: scale(9, 6),
    paddingHorizontal: scale(8, 4),
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 14,
  },
  slot: {
    flex: 1,
    alignItems: 'center',
  },
  halo: {
    width: scale(40, 34),
    height: scale(40, 34),
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  haloOn: {
    backgroundColor: HUE.dockGlow,
    borderWidth: 1,
    borderColor: 'rgba(142,128,240,0.55)',
  },
  glyph: {
    fontSize: scale(19, 16),
  },
  glyphDim: {
    opacity: 0.55,
  },
  tag: {
    fontSize: scale(10, 9),
    color: HUE.ghost,
    fontWeight: '600',
  },
  tagOn: {
    color: HUE.amber,
  },
});

export default HarborTabDock;
