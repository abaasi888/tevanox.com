import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Toast = ({ visible, message, type = 'success', onDismiss, duration = 3000 }) => {
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          onDismiss?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  const getColors = () => {
    switch (type) {
      case 'success':
        return { bg: '#4CAF50', icon: 'check-circle' };
      case 'error':
        return { bg: '#FF4757', icon: 'error' };
      case 'warning':
        return { bg: '#FF9800', icon: 'warning' };
      case 'info':
        return { bg: '#2196F3', icon: 'info' };
      default:
        return { bg: '#4CAF50', icon: 'check-circle' };
    }
  };

  const colors = getColors();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: colors.bg, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Icon name={colors.icon} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity onPress={onDismiss} style={styles.dismiss}>
        <Icon name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    elevation: 5,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  dismiss: {
    padding: 4,
  },
});

export default Toast;