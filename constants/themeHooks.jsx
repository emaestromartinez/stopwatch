import { themedColors } from './colors';

const useTheme = () => {
//   const theme = 'default';
  const theme = 'light';
  const colors = theme ? themedColors[theme] : themedColors.default;

  return {
    colors,
    theme,
  };
};

export default useTheme;
