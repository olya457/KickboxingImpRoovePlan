import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { EdgeInsetProvider } from './vault/EdgeInsetKeeper';
import { PlanLedgerProvider } from './vault/PlanLedger';
import { TrainingDiaryProvider } from './vault/TrainingDiary';
import { KeepsakeProvider } from './vault/KeepsakeStore';
import { FuelLogProvider } from './vault/FuelLog';
import { FlowOrchestrator } from './navigation/FlowOrchestrator';
import StageRoot from './navigation/StageRoot';

const RootHarness: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    <EdgeInsetProvider>
      <PlanLedgerProvider>
        <TrainingDiaryProvider>
            <KeepsakeProvider>
              <FuelLogProvider>
                <FlowOrchestrator>
                  <StageRoot />
                </FlowOrchestrator>
              </FuelLogProvider>
            </KeepsakeProvider>
        </TrainingDiaryProvider>
      </PlanLedgerProvider>
    </EdgeInsetProvider>
  </SafeAreaProvider>
);

export default RootHarness;
