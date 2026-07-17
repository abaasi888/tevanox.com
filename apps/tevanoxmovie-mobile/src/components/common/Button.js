import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

const Button = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  icon,
  fullWidth = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return ['#FF4757', '#CC1A2C'];
      case 'secondary':
        return ['#1a1a2e', '#2a2a4e'];
      case 'success':
        return ['#4CAF50', '#2E7D32'];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return ['#FF4757', '#CC1A2C'];
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 };
      case 'large':
        return { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 };
      default:
        return { paddingVertical: 14, paddingHorizontal: 24, fontSize: 16 };
    }
  };

  const isOutline = variant === 'outline';
  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        isOutline && styles.outlineButton,
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      activeOpacity={0.7}
    >
      {isOutline ? (
        <View style={[styles.outlineContent, { paddingVertical: sizeStyles.paddingVertical }]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, styles.outlineText, textStyle, { fontSize: sizeStyles.fontSize }]}>
            {title}
          </Text>
        </View>
      ) : (
        <LinearGradient
          colors={getColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            {
              paddingVertical: sizeStyles.paddingVertical,
              paddingHorizontal: sizeStyles.paddingHorizontal,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.content}>
              {icon && <View style={styles.iconContainer}>{icon}</View>}
              <Text style={[styles.text, textStyle, { fontSize: sizeStyles.fontSize }]}>
                {title}
              </Text>
            </View>
          )}
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 48,
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: '#FF4757',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  outlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  outlineText: {
    color: '#FF4757',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;