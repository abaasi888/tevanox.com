import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DownloadButton = ({
  onPress,
  size = 'medium',
  disabled = false,
  initialDownloaded = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(initialDownloaded);

  const handlePress = async () => {
    if (downloaded) return;
    setLoading(true);
    try {
      await onPress();
      setDownloaded(true);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: 6, fontSize: 12, iconSize: 16 };
      case 'large':
        return { padding: 14, fontSize: 16, iconSize: 24 };
      default:
        return { padding: 10, fontSize: 14, iconSize: 20 };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        downloaded && styles.downloaded,
        disabled && styles.disabled,
        { padding: sizeStyles.padding },
      ]}
      onPress={handlePress}
      disabled={loading || downloaded || disabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : downloaded ? (
        <>
          <Icon name="check-circle" size={sizeStyles.iconSize} color="#4CAF50" />
          <Text style={[styles.text, { fontSize: sizeStyles.fontSize }, styles.downloadedText]}>
            Downloaded
          </Text>
        </>
      ) : (
        <>
          <Icon name="download" size={sizeStyles.iconSize} color="#fff" />
          <Text style={[styles.text, { fontSize: sizeStyles.fontSize }]}>
            Download
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4757',
    gap: 8,
  },
  downloaded: {
    borderColor: '#4CAF50',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
  downloadedText: {
    color: '#4CAF50',
  },
});

export default DownloadButton;