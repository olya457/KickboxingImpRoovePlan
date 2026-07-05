import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFlow } from './FlowOrchestrator';
import { DOCK } from './routePaths';
import HarborTabDock from './HarborTabDock';
import { HUE } from '../palette/tokens';
import DrillCatalogStage from '../theatre/drills/DrillCatalogStage';
import BlueprintQuizStage from '../theatre/blueprint/BlueprintQuizStage';
import FuelMeterStage from '../theatre/fuelmeter/FuelMeterStage';
import ReadsShelfStage from '../theatre/reads/ReadsShelfStage';
import SavedVaultStage from '../theatre/saved/SavedVaultStage';
import UnlockTierStage from '../theatre/unlock/UnlockTierStage';

const ShellDeck: React.FC = () => {
  const { tab } = useFlow();

  return (
    <View style={styles.root}>
      <View style={styles.body}>
        {tab === DOCK.catalog && <DrillCatalogStage />}
        {tab === DOCK.blueprint && <BlueprintQuizStage />}
        {tab === DOCK.fuel && <FuelMeterStage />}
        {tab === DOCK.shelf && <ReadsShelfStage />}
        {tab === DOCK.vault && <SavedVaultStage />}
        {tab === DOCK.tier && <UnlockTierStage />}
      </View>
      <HarborTabDock />
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HUE.abyss },
  body: { flex: 1 },
});

export default ShellDeck;
