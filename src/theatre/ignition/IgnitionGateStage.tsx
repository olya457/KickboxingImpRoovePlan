import React, { useCallback, useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCENERY } from '../../ledger/assetAtlas';
import { HUE } from '../../palette/tokens';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { FLOW } from '../../navigation/routePaths';

const SPARK_HTML = `
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<style>
  html,body{margin:0;height:100%;background:transparent;overflow:hidden;
    display:flex;align-items:center;justify-content:center;}
  .orbit{position:relative;width:120px;height:120px;}
  .ring{position:absolute;inset:0;border-radius:50%;border:4px solid rgba(255,255,255,0.08);
    border-top-color:#F4C64B;border-right-color:#8E80F0;animation:spin 1s linear infinite;}
  .ring.two{inset:16px;border-top-color:#8E80F0;border-right-color:#F4C64B;
    animation-duration:1.4s;animation-direction:reverse;}
  .core{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
    font-size:44px;animation:pulse 1.2s ease-in-out infinite;}
  @keyframes spin{to{transform:rotate(360deg);}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.14);}}
</style></head>
<body><div class="orbit"><div class="ring"></div><div class="ring two"></div>
<div class="core">🥊</div></div></body></html>`;

const IgnitionGateStage: React.FC = () => {
  const { swap } = useFlow();
  const safe = useSafeAreaInsets();
  const done = useRef(false);

  const leave = useCallback(() => {
    if (done.current) return;
    done.current = true;
    swap(FLOW.prelude);
  }, [swap]);

  useEffect(() => {
    const t = setTimeout(leave, 5000);
    return () => clearTimeout(t);
  }, [leave]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={SCENERY.recovery} style={styles.bg} resizeMode="cover">
        <View style={styles.veil} />
        <TouchableOpacity
          style={[styles.skip, { top: safe.top + 12 }]}
          onPress={leave}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.skipTxt}>Skip</Text>
        </TouchableOpacity>

        <View style={[styles.crown, { top: safe.top + 40 }]}>
          <Image
            source={SCENERY.wordmark}
            style={styles.wordmark}
            resizeMode="contain"
          />
        </View>

        <View style={[styles.dock, { bottom: safe.bottom + 90 }]}>
          <View style={styles.stage}>
            <WebView
              originWhitelist={['*']}
              source={{ html: SPARK_HTML }}
              style={styles.web}
              scrollEnabled={false}
              backgroundColor="transparent"
              androidLayerType="hardware"
            />
          </View>
        </View>

        <Text style={[styles.foot, { bottom: safe.bottom + 26 }]}>
          Preparing your training floor…
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HUE.abyss },
  bg: { flex: 1 },
  veil: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15,12,40,0.45)',
  },
  skip: { position: 'absolute', right: 22 },
  skipTxt: { color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: '600' },
  crown: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  stage: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
  },
  web: { flex: 1, backgroundColor: 'transparent' },
  wordmark: {
    width: 260,
    height: 140,
  },
  foot: {
    position: 'absolute',
    alignSelf: 'center',
    color: HUE.mist,
    fontSize: 13,
  },
});

export default IgnitionGateStage;
