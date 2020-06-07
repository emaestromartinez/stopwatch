export const palette = {
  darkestOrange: '#ff6600',
  darkOrange: '#ff781f',
  orange: '#ff8b3d',
  lightOrange: '#ff9d5c',
  lightestOrange: '#ffaf7a',

  darkestPurple: '#691883',
  darkPurple: '#b148d2',
  purple: '#e79aff',
  lightPurple: '#f3ccff',
  lightestPurple: '#fbeeff',

  darkestBloodRed: '#450f0d',
  darkBloodRed: '#740a06',
  bloodRed: '#9b0d08',
  lightBloodRed: '#d5120b',

  darkestGrey: '#1a1919',
  darkGrey: '#2a2828',
  grey: '#686464',
  lightGrey: '#a8a4a4',
  lightestGrey: '#dad8d8',

  buildTheGiantOrange: '#ea9c00',


  black: '#000000',
  white: '#FFFFFF',
};

export const colors = {

  headerBGPrimary: palette.darkestGrey,
  headerTextPrimary: palette.buildTheGiantOrange,

  buttonBackground: palette.grey,
  buttonBorderPrimary: palette.buildTheGiantOrange,
  buttonTextPrimary: palette.buildTheGiantOrange,
  buttonDisabledOpacity: 0.3,

  inputBackground: palette.grey,

  screenBackground: palette.darkGrey,

  progressBarColor: palette.buildTheGiantOrange,
  progressPieColor: palette.buildTheGiantOrange,
  progressCircleColor: palette.buildTheGiantOrange,

  textPrimary: palette.lightestGrey,


  accent: '#ff8b3d',
};
export const themedColors = {
  default: {
    ...colors,
  },
  light: {
    ...colors,
    screenBackground: palette.lightestGrey,

    buttonBackground: palette.darkestGrey,

    textPrimary: palette.darkestGrey,

    buttonDisabledOpacity: 0.7,
  },
  dark: {
    ...colors,
  },
};
