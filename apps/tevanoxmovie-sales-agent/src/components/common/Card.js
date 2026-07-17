import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, variant = 'default', onPress }) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        variant === 'elevated' && styles.elevated,
        variant === 'gradient' && styles.gradient,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  gradient: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    overflow: 'hidden',
  },
});

export default Card;