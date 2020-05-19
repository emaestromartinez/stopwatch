import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
  const { style, children } = props;
  return (
    <View style={{ ...styles.card, ...style }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 8,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
  },
});

export default Card;
