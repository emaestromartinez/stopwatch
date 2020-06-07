
import { useSelector } from 'react-redux';
import { themedColors } from './colors';

const useTheme = (theme = 'default') => {
  const colors = theme ? themedColors[theme] : themedColors.default;

  return {
    colors,
    theme,
  };
};

export default useTheme;
