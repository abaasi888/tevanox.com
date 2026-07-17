import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useShare } from '../../hooks/useShare';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import SocialShare from '../../components/marketing/SocialShare';

const ShareScreen = ({ navigation }) => {
  const { agent } = useAgent();
  const { shareGeneral } = useShare();
  const [customMessage, setCustomMessage] = useState(
    `📱 Download TevanoxMovie and get premium entertainment! Use my agent code: ${agent?.agent_code}\n\n🎬 Movies & Music - Unlimited Streaming\n💰 Subscribe and enjoy!`
  );

  const shareWithCustomMessage = () => {
    shareGeneral(agent?.agent_code, customMessage);
  };

  const copyReferralLink = () => {
    const link = `https://tevanox.com/register?ref=${agent?.agent_code}`;
    // Copy to clipboard
    Alert.alert('Copied!', 'Referral link copied to clipboard');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📤 Share</Text>
        <View style={{ width: 28 }} />
      </View>

      <Card variant="elevated" style={styles.codeCard}>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <Text style={styles.code}>{agent?.agent_code}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={copyReferralLink}>
          <Icon name="content-copy" size={20} color="#9C27B0" />
          <Text style={styles.copyText}>Copy Link</Text>
        </TouchableOpacity>
      </Card>

      <Card style={styles.messageCard}>
        <Text style={styles.messageLabel}>Custom Message</Text>
        <TextInput
          style={styles.messageInput}
          value={customMessage}
          onChangeText={setCustomMessage}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
        <Button
          title="Share with Message"
          onPress={shareWithCustomMessage}
          size="small"
          style={styles.shareButton}
        />
      </Card>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <SocialShare
        agentCode={agent?.agent_code}
        message={customMessage}
        onShare={(platform) => {
          Alert.alert('Success', `Shared via ${platform}!`);
        }}
      />

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>📊 Share Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Shares</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Clicks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>0%</Text>
            <Text style={styles.statLabel}>Conversion</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  codeCard: {
    alignItems: 'center',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  codeLabel: {
    color: '#888',
    fontSize: 14,
  },
  code: {
    color: '#9C27B0',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
    letterSpacing: 2,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(156,39,176,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  copyText: {
    color: '#9C27B0',
    marginLeft: 8,
  },
  messageCard: {
    marginTop: 8,
  },
  messageLabel: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  messageInput: {
    backgroundColor: '#2a2a3e',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    fontSize: 14,
  },
  shareButton: {
    marginTop: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2a2a3e',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 16,
    fontSize: 12,
  },
  statsContainer: {
    backgroundColor: '#1a1a2e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  statsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#9C27B0',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ShareScreen;