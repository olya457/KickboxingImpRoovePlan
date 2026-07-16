import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCENERY } from '../../ledger/assetAtlas';
import { CANVAS, HUE, RADIUS, scale } from '../../palette/tokens';
import CrownButton from '../../widgets/CrownButton';
import { useFlow } from '../../navigation/FlowOrchestrator';
import { FLOW } from '../../navigation/routePaths';

interface Slide {
  art: ImageSourcePropType;
  title: string;
  body: string;
}

const REEL: Slide[] = [
  {
    art: SCENERY.striker,
    title: 'Train With Purpose',
    body: 'Build a structured kickboxing routine designed around your goals, level, and daily progress.',
  },
  {
    art: SCENERY.nutrition,
    title: 'Personalized Daily Plans',
    body: 'Answer a few simple questions and receive a training plan with exercises, calories, water, and sleep goals.',
  },
  {
    art: SCENERY.recovery,
    title: 'Track Your Fuel',
    body: 'Log breakfast, lunch, and dinner while the progress bar helps you stay close to your daily calorie target.',
  },
  {
    art: SCENERY.hydrate,
    title: 'Record Your Progress',
    body: 'Mark training days in your personal diary and revisit every completed workout whenever you need.',
  },
];

const PreludeReelStage: React.FC = () => {
  const { swap } = useFlow();
  const safe = useSafeAreaInsets();
  const scroller = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const finish = () => swap(FLOW.shell);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / CANVAS.width);
    if (next !== page) setPage(next);
  };

  const advance = () => {
    if (page >= REEL.length - 1) {
      finish();
      return;
    }
    scroller.current?.scrollTo({ x: (page + 1) * CANVAS.width, animated: true });
    setPage(page + 1);
  };

  const last = page === REEL.length - 1;

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        ref={scroller}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
      >
        {REEL.map((slide, i) => (
          <ImageBackground
            key={i}
            source={slide.art}
            style={styles.slide}
            resizeMode="cover"
          >
            <View style={styles.scrim} />
          </ImageBackground>
        ))}
      </ScrollView>

      {!last && (
        <TouchableOpacity
          style={[styles.skip, { top: safe.top + 12 }]}
          onPress={finish}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={styles.skipTxt}>Skip</Text>
        </TouchableOpacity>
      )}

      <View style={[styles.deck, { paddingBottom: safe.bottom + 24 }]}>
        <Text style={styles.title}>{REEL[page].title}</Text>
        <Text style={styles.body}>{REEL[page].body}</Text>
        <View style={styles.dots}>
          {REEL.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotOn]} />
          ))}
        </View>
        <CrownButton
          label={last ? 'Get Started' : 'Continue'}
          onPress={advance}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HUE.abyss },
  slide: { width: CANVAS.width, height: CANVAS.height },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(12,10,32,0.35)',
  },
  skip: { position: 'absolute', right: 22 },
  skipTxt: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },
  deck: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 22,
    paddingTop: 26,
    backgroundColor: 'rgba(15,12,38,0.82)',
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
  },
  title: {
    color: HUE.ink,
    fontSize: scale(26, 22),
    fontWeight: '900',
    textAlign: 'center',
  },
  body: {
    color: HUE.mist,
    fontSize: scale(14, 13),
    lineHeight: scale(21, 19),
    textAlign: 'center',
    marginTop: 10,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: HUE.outline,
    marginHorizontal: 4,
  },
  dotOn: { width: 22, backgroundColor: HUE.amber },
});

export default PreludeReelStage;
