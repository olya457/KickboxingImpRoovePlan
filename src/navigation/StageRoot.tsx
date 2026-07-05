import React from 'react';
import { useFlow } from './FlowOrchestrator';
import { FLOW } from './routePaths';
import IgnitionGateStage from '../theatre/ignition/IgnitionGateStage';
import PreludeReelStage from '../theatre/prelude/PreludeReelStage';
import ShellDeck from './ShellDeck';
import DrillDetailStage from '../theatre/drills/DrillDetailStage';
import ReadsDetailStage from '../theatre/reads/ReadsDetailStage';

const StageRoot: React.FC = () => {
  const { frame } = useFlow();

  switch (frame.key) {
    case FLOW.gate:
      return <IgnitionGateStage />;
    case FLOW.prelude:
      return <PreludeReelStage />;
    case FLOW.drillDetail:
      return <DrillDetailStage />;
    case FLOW.readDetail:
      return <ReadsDetailStage />;
    case FLOW.shell:
    default:
      return <ShellDeck />;
  }
};

export default StageRoot;
