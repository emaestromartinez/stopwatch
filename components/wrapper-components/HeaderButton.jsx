import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { useSelector } from 'react-redux';
import useTheme from '../../constants/themeHooks';

const CustomHeaderButton = (props) => {
  // Color theme
  const themeStore = useSelector((state) => state.theme);
  const { colors } = useTheme(themeStore.theme);

  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={colors.headerTextPrimary}
    />
  );
};

export default CustomHeaderButton;
