import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import useTheme from '../../constants/themeHooks';

const CustomHeaderButton = (props) => {
  const { colors } = useTheme();

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
