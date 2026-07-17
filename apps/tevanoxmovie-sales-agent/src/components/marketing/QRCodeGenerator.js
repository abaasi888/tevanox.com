import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QRCodeGenerator = ({ agentCode, onPress, size = 150, loading = false }) => {
  const link = `https://tevanox.com/register?ref=${agentCode}`;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={[styles.qrPlaceholder, { width: size, height: size }]} />
        <Text style={styles.loadingText}>Generating QR Code...</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.qrContainer}>
        <QRCode
          value={link}
          size={size}
          color="#fff"
          backgroundColor="transparent"
        />
      </View>
      <Text style={styles.label}>Scan to join</Text>
      <Text style={styles.code}>{agentCode}</Text>
      <View style={styles.button}>
        <Icon name="expand" size={16} color="#9C27B0" />
        <Text style={styles.buttonText}>Tap to enlarge</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  qrContainer: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 12,
  },
  code: {
    color: '#9C27B0',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(156,39,176,0.1)',
    borderRadius: 12,
  },
  buttonText: {
    color: '#9C27B0',
    fontSize: 12,
    marginLeft: 4,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  qrPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  loadingText: {
    color: '#888',
    fontSize: 14,
    marginTop: 12,
  },
});

export default QRCodeGenerator;