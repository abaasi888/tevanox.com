import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  Dimensions,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

const { width } = Dimensions.get('window');

const QRCodeScreen = ({ navigation }) => {
  const { agent } = useAgent();
  const qrRef = useRef();

  const shareQRCode = () => {
    // Share QR code logic
    Alert.alert('Share QR Code', 'Share your QR code with others');
  };

  const downloadQRCode = () => {
    // Download QR code logic
    Alert.alert('Download QR Code', 'QR code downloaded successfully');
  };

  const link = `https://tevanox.com/register?ref=${agent?.agent_code}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📱 QR Code</Text>
        <View style={{ width: 28 }} />
      </View>

      <Card variant="elevated" style={styles.qrCard}>
        <View style={styles.qrContainer}>
          <QRCode
            value={link}
            size={width - 120}
            color="#fff"
            backgroundColor="transparent"
          />
        </View>
        <Text style={styles.agentName}>{agent?.full_name}</Text>
        <Text style={styles.agentCode}>Code: {agent?.agent_code}</Text>
        <Text style={styles.scanText}>Scan to join TevanoxMovie</Text>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Share QR Code"
          onPress={shareQRCode}
          style={styles.actionButton}
          icon={<Icon name="share" size={20} color="#fff" />}
        />
        <Button
          title="Download"
          onPress={downloadQRCode}
          variant="outline"
          style={styles.actionButton}
          icon={<Icon name="download" size={20} color="#9C27B0" />}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>💡 How to use</Text>
        <View style={styles.infoItem}>
          <Icon name="qr-code-scanner" size={20} color="#9C27B0" />
          <Text style={styles.infoText}>
            Share this QR code with friends and family
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="open-in-new" size={20} color="#9C27B0" />
          <Text style={styles.infoText}>
            They scan it to go directly to the registration page
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="people" size={20} color="#9C27B0" />
          <Text style={styles.infoText}>
            You earn commissions when they subscribe
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0033',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#1a1a2e',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  qrCard: {
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  qrContainer: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
  },
  agentName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  agentCode: {
    color: '#9C27B0',
    fontSize: 14,
    marginTop: 4,
  },
  scanText: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: '#1a1a2e',
    margin: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  infoText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
});

export default QRCodeScreen;