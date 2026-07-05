export const FLOW = {
  gate: 'gate',
  prelude: 'prelude',
  shell: 'shell',
  drillDetail: 'drillDetail',
  readDetail: 'readDetail',
  blueprintResult: 'blueprintResult',
} as const;

export type FlowKey = (typeof FLOW)[keyof typeof FLOW];

export const DOCK = {
  catalog: 'catalog',
  blueprint: 'blueprint',
  fuel: 'fuel',
  shelf: 'shelf',
  vault: 'vault',
  tier: 'tier',
} as const;

export type DockKey = (typeof DOCK)[keyof typeof DOCK];

export interface DockDef {
  key: DockKey;
  glyph: string;
  label: string;
}

export const DOCK_ITEMS: DockDef[] = [
  { key: DOCK.catalog, glyph: '🥊', label: 'Drills' },
  { key: DOCK.blueprint, glyph: '🎯', label: 'Plan' },
  { key: DOCK.fuel, glyph: '🔥', label: 'Fuel' },
  { key: DOCK.shelf, glyph: '📖', label: 'Reads' },
  { key: DOCK.vault, glyph: '💛', label: 'Saved' },
  { key: DOCK.tier, glyph: '👑', label: 'Premium' },
];
