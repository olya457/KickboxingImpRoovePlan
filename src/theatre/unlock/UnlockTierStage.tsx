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
import { HUE, RADIUS, SPACE, scale } from '../../palette/tokens';
import { useTierGate } from '../../vault/TierGate';
import { useStore, PlanId } from '../../vault/StoreVault';

const PERKS = [
  { glyph: '📅', text: 'Full 30-day personalized training calendar' },
  { glyph: '📖', text: 'Complete library of all 12 articles' },
  { glyph: '🔥', text: 'Unlimited calorie tracking with history' },
  { glyph: '🥊', text: 'Every workout and progression unlocked' },
  { glyph: '🌙', text: 'Rest days and gradual load increases' },
];

const PLANS: { id: PlanId; title: string; price: string; note: string }[] = [
  { id: 'month', title: 'Monthly', price: '$4.99', note: 'per month' },
  { id: 'year', title: 'Yearly', price: '$29.99', note: 'per year · best value' },
  { id: 'life', title: 'Lifetime', price: '$59.99', note: 'one-time payment' },
];

const UnlockTierStage: React.FC = () => {
  const clearance = useDockClearance();
  const tier = useTierGate();
  const store = useStore();
  const [plan, setPlan] = useState<PlanId>('year');

  const buy = () => store.buy(plan);
  const restore = () => store.restore();

  return (
    <StageCanvas>
      <CresetTitle title="Premium" caption="Unlock the full experience" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: clearance, paddingHorizontal: SPACE.lg }}
      >
        <View style={styles.crest}>
          <Text style={styles.crown}>👑</Text>
          <Text style={styles.crestTitle}>
            {tier.premium ? 'You are Premium' : 'Go Premium'}
          </Text>
          <Text style={styles.crestBody}>
            {tier.premium
              ? 'All features are unlocked. Train with the complete plan.'
              : 'Get everything you need to train with structure and progress.'}
          </Text>
        </View>

        <View style={styles.perkCard}>
          {PERKS.map(p => (
            <View key={p.text} style={styles.perkRow}>
              <Text style={styles.perkGlyph}>{p.glyph}</Text>
              <Text style={styles.perkTxt}>{p.text}</Text>
            </View>
          ))}
        </View>

        {tier.premium ? (
          <CrownButton
            label="Manage Subscription"
            tone="ghost"
            onPress={store.manage}
            style={styles.gap}
          />
        ) : (
          <>
            <Text style={styles.sectionHead}>CHOOSE YOUR PLAN</Text>
            {PLANS.map(p => {
              const on = plan === p.id;
              return (
                <TouchableOpacity
                  key={p.id}
                  activeOpacity={0.85}
                  onPress={() => setPlan(p.id)}
                  style={[styles.plan, on && styles.planOn]}
                >
                  <View style={styles.radio}>
                    {on && <View style={styles.radioDot} />}
                  </View>
                  <View style={styles.planBody}>
                    <Text style={styles.planTitle}>{p.title}</Text>
                    <Text style={styles.planNote}>{p.note}</Text>
                  </View>
                  <Text style={styles.planPrice}>
                    {store.priceFor(p.id) ?? p.price}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <CrownButton
              label="Unlock Premium"
              onPress={buy}
              busy={store.busy}
              style={styles.gap}
            />
            <TouchableOpacity onPress={restore} style={styles.restore}>
              <Text style={styles.restoreTxt}>Restore Purchases</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </StageCanvas>
  );
};

const styles = StyleSheet.create({
  crest: {
    backgroundColor: HUE.panel,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.lg,
    alignItems: 'center',
  },
  crown: { fontSize: 40 },
  crestTitle: { color: HUE.ink, fontSize: scale(22, 19), fontWeight: '900', marginTop: 8 },
  crestBody: {
    color: HUE.mist,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 6,
  },
  perkCard: {
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginTop: SPACE.md,
  },
  perkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  perkGlyph: { fontSize: 20, marginRight: 12 },
  perkTxt: { color: HUE.ink, fontSize: scale(14, 13), flex: 1, lineHeight: 20 },
  sectionHead: {
    color: HUE.ghost,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: SPACE.lg,
    marginBottom: 12,
  },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HUE.midnight,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: HUE.outline,
    padding: SPACE.md,
    marginBottom: 12,
  },
  planOn: { borderColor: HUE.amber, backgroundColor: HUE.panelSoft },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: HUE.outline,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: HUE.amber },
  planBody: { flex: 1 },
  planTitle: { color: HUE.ink, fontSize: scale(16, 15), fontWeight: '800' },
  planNote: { color: HUE.mist, fontSize: 12, marginTop: 2 },
  planPrice: { color: HUE.amber, fontSize: scale(17, 16), fontWeight: '900' },
  gap: { marginTop: 4 },
  restore: { alignItems: 'center', paddingVertical: 16 },
  restoreTxt: { color: HUE.violetSoft, fontSize: 14, fontWeight: '700' },
});

export default UnlockTierStage;
