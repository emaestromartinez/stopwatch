import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import useTheme from '../../constants/themeHooks';

const CustomHeaderButton = (props) => {
  const { Colors } = useTheme();

  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.buttonBGPrimary}
    />
  );
};

export default CustomHeaderButton;

// import React from 'react';
// import { Platform } from 'react-native';
// import { HeaderButton } from 'react-navigation-header-buttons';
// import { Ionicons } from '@expo/vector-icons';

// import Colors from '../../constants/colors';

// const CustomHeaderButton = (props) => (
//   <HeaderButton
//     {...props}
//     IconComponent={Ionicons}
//     iconSize={23}
//     color={Platform.OS === 'android' ? 'white' : Colors.primary}
//   />
// );

// export default CustomHeaderButton;
