import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const CANVAS = {
  width,
  height,
  compact: height < 700 || width < 360,
};

export const HUE = {
  abyss: '#141032',
  midnight: '#1B1642',
  slate: '#241E52',
  panel: '#2A2358',
  panelSoft: '#322A66',
  outline: '#463C86',
  amber: '#F4C64B',
  amberDeep: '#E0A92E',
  violet: '#7A6BE3',
  violetSoft: '#8E80F0',
  mint: '#5FD48A',
  mintVeil: 'rgba(95,212,138,0.16)',
  orange: '#F2913C',
  ink: '#FFFFFF',
  mist: '#B7AFD9',
  ghost: '#867CB0',
  danger: '#F06767',
  glassLine: 'rgba(255,255,255,0.14)',
  dockGlow: 'rgba(122,107,227,0.28)',
};

export const scale = (base: number, small: number) =>
  CANVAS.compact ? small : base;

export const EDGE = {
  iosDockGap: 20,
  androidDockGap: 30,
  androidPersistPad: 30,
};

export const isDroid = Platform.OS === 'android';

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 22,
  pill: 999,
};

export const SPACE = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
};
