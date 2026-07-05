import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StageCanvas, { useDockClearance } from '../../widgets/StageCanvas';
import CresetTitle from '../../widgets/CresetTitle';
import CrownButton from '../../widgets/CrownButton';
import { QUIZ_DECK } from '../../ledger/quizDeck';
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { usePlanLedger } from '../../vault/PlanLedger';
import BlueprintResultStage from './BlueprintResultStage';

const BlueprintQuizStage: React.FC = () => {
  const clearance = useDockClearance();
  const ledger = usePlanLedger();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Record<string, string>>({});

  if (ledger.hasPlan) return <BlueprintResultStage />;

  const probe = QUIZ_DECK[step];
  const chosen = draft[probe.id];
  const last = step === QUIZ_DECK.length - 1;
  const progress = ((step + 1) / QUIZ_DECK.length) * 100;

  const advance = () => {
    if (!chosen) return;
    if (last) {
      ledger.savePlan(draft);
      return;
    }
    setStep(step + 1);
  };

  return (
    <StageCanvas>
      <CresetTitle
        title="Personalization"
        caption={`Question ${step + 1} of ${QUIZ_DECK.length}`}
      />
      <View style={styles.trackWrap}>
        <View style={[styles.track, { width: `${progress}%` }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        <Text style={styles.prompt}>{probe.prompt}</Text>
        {probe.options.map(opt => {
          const on = chosen === opt;
          return (
            <TouchableOpacity
              key={opt}
              activeOpacity={0.85}
              onPress={() => setDraft({ ...draft, [probe.id]: opt })}
              style={[styles.option, on && styles.optionOn]}
            >
              <Text style={[styles.optionTxt, on && styles.optionTxtOn]}>{opt}</Text>
              {on && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          );
        })}

        <CrownButton
          label={last ? 'See My Plan' : 'Continue'}
          onPress={advance}
          disabled={!chosen}
          style={styles.cta}
        />
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  trackWrap: {
    height: 4,
    backgroundColor: HUE.slate,
    marginHorizontal: SPACE.lg,
    borderRadius: 2,
    marginBottom: SPACE.lg,
    overflow: 'hidden',
  },
  track: { height: 4, backgroundColor: HUE.amber },
  prompt: {
    color: HUE.ink,
    fontSize: scale(22, 19),
    fontWeight: '800',
    marginBottom: SPACE.md,
  },
  option: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionOn: { backgroundColor: HUE.panelSoft, borderColor: HUE.violetSoft },
  optionTxt: { color: HUE.mist, fontSize: scale(16, 15), fontWeight: '600' },
  optionTxtOn: { color: HUE.ink, fontWeight: '700' },
  check: { color: HUE.amber, fontSize: 18, fontWeight: '800' },
  cta: { marginTop: SPACE.sm },
});

export default BlueprintQuizStage;
