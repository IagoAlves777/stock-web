import { extendTheme, ThemeConfig, useColorMode } from '@chakra-ui/react';

import { DefaultTheme } from 'styled-components';

import { CardComponent } from './additions/card/card';
import { badgeStyles } from './components/badge';
import { buttonStyles } from './components/button';
import { inputStyle } from './components/input';
import { linkStyles } from './components/link';
import { modalStyle } from './components/modal';
import { progressStyles } from './components/progress';
import { sliderStyles } from './components/slider';
import { switchStyles } from './components/switch';
import { textareaStyles } from './components/textarea';
import { tooltipStyles } from './components/tooltip';
import { breakpoints } from './foundations/breakpoints';
import { globalStyles } from './styles';

type Color =
  | 'TEXT'
  | 'SCROLL'
  | 'REFERENCIAL_LINE'
  | 'TOAST'
  | 'LOADING'
  | 'SQL_THEME'
  | 'BG'
  | 'WARNING'
  | 'TOOLTIPBG'
  | 'LIGHT_TEXT';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export const HandleColors = (type: Color): string => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  switch (type) {
    case 'TEXT':
      return isDark ? '#fff' : '#222';
    case 'SCROLL':
      return isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
    case 'REFERENCIAL_LINE':
      return isDark ? 'white' : 'red';
    case 'TOAST':
      return isDark ? 'white' : 'white';
    case 'LOADING':
      return isDark ? 'navy.900' : 'blue.200';
    case 'SQL_THEME':
      return isDark ? 'material-palenight' : 'neat';
    case 'BG':
      return isDark ? '#2d3748' : 'white';
    case 'WARNING':
      return isDark ? 'yellow.200' : 'red.500';
    case 'TOOLTIPBG':
      return isDark ? 'navy.700' : 'white';
    case 'LIGHT_TEXT':
      return isDark ? '#222' : '#fff';
    default:
      return isDark ? '#fff' : '#000';
  }
};

export default extendTheme(
  { breakpoints, config, components: { Modal: modalStyle, Input: inputStyle, Tooltip: tooltipStyles } },
  globalStyles,
  badgeStyles,
  buttonStyles,
  linkStyles,
  progressStyles,
  sliderStyles,
  textareaStyles,
  switchStyles,
  CardComponent,
);

export const lightTheme: DefaultTheme = {
  name: 'light',
  colors: {
    primary: '#ef8119',
    secondary: '#0573b1',
    text: '#718096',
    lightText: '#FFF',
    mutedText: '#8F969C',
    darkBlue: '#0d193a',
    background: '#F0F0F5',
    secondaryBackground: '#FFF',

    success: '#2a9d8f',
    error: '#EF4444',
    warning: '#ffc107',
    info: '#7bdff2',
    default: '#C7D3DD',
    disabled: '#0000004d',

    border: '#0000001f',
    ripple: '#0000000a',
    itemSelected: 'rgba(0, 0, 0, 0.08)',
    inputBorder: '#E2E8F0',
  },
};

export const darkTheme: DefaultTheme = {
  name: 'dark',
  colors: {
    primary: '#ef8119',
    secondary: '#0573b1',
    text: '#FFF',
    lightText: '#FFF',
    mutedText: '#8F969C',
    darkBlue: '#111c44',
    background: '#0B1437',
    secondaryBackground: '#FFF',

    success: '#2a9d8f',
    error: '#EF4444',
    warning: '#ffc107',
    info: '#7bdff2',
    default: '#C7D3DD',
    disabled: '#0000004d',

    border: '#0000001f',
    ripple: '#0000000a',
    itemSelected: 'rgba(0, 0, 0, 0.08)',
    inputBorder: 'rgba(255, 255, 255, 0.16)',
  },
};

export const chartColors = [
  '#5683af',
  '#ef8119',
  '#EDBD47',
  '#9CA376',
  '#e2974b',
  '#9c8d7d',
  '#8b8b8a',
  '#d09457',
  '#d2d2d2',
  '#cecece',
  '#e1e1e1',
  '#ad8f70',
];
