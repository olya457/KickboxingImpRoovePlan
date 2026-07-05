import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EdgeInsetProvider } from './vault/EdgeInsetKeeper';
import { TierGateProvider } from './vault/TierGate';
import { StoreVaultProvider } from './vault/StoreVault';
import { PlanLedgerProvider } from './vault/PlanLedger';
import { KeepsakeProvider } from './vault/KeepsakeStore';
import { FuelLogProvider } from './vault/FuelLog';
import { FlowOrchestrator } from './navigation/FlowOrchestrator';
import StageRoot from './navigation/StageRoot';

const RootHarness: React.FC = () => (
  <SafeAreaProvider>
    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    <EdgeInsetProvider>
      <TierGateProvider>
        <StoreVaultProvider>
          <PlanLedgerProvider>
            <KeepsakeProvider>
              <FuelLogProvider>
                <FlowOrchestrator>
                  <StageRoot />
                </FlowOrchestrator>
              </FuelLogProvider>
            </KeepsakeProvider>
          </PlanLedgerProvider>
        </StoreVaultProvider>
      </TierGateProvider>
    </EdgeInsetProvider>
  </SafeAreaProvider>
);

export default RootHarness;
