import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useShare } from '../../hooks/useShare';
import SocialShare from '../../components/marketing/SocialShare';
import MarketingMaterials from '../../components/marketing/MarketingMaterials';
import QRCodeGenerator from '../../components/marketing/QRCodeGenerator';
import ShareLink from '../../components/marketing/ShareLink';
import Card from '../../components/common/Card';
import { getMarketingMaterials } from '../../api/marketing';

const MarketingHub = ({ navigation }) => {
  const { agent } = useAgent();
  const { shareGeneral } = useShare();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    try {
      const response = await getMarketingMaterials();
      setMaterials(response.data);
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform) => {
    Alert.alert('Success', `Shared via ${platform}!`);
  };

  const stats = [
    { label: 'Total Shares', value: '0' },
    { label: 'Total Clicks', value: '0' },
    { label: 'Conversion Rate', value: '0%' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>📢 Marketing Hub</Text>
        <View style={{ width: 28 }} />
      </View>

      <SocialShare
        agentCode={agent?.agent_code}
        onShare={handleShare}
      />

      <Card variant="elevated" style={styles.statsCard}>
        <Text style={styles.statsTitle}>📊 Your Stats</Text>
        <View style={styles.statsRow}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <ShareLink
        agentCode={agent?.agent_code}
        title="📤 Share Referral Link"
        onShare={() => Alert.alert('Success', 'Link copied to clipboard!')}
      />

      <QRCodeGenerator
        agentCode={agent?.agent_code}
        onPress={() => navigation.navigate('QRCode')}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📁 Marketing Materials</Text>
        <MarketingMaterials
          materials={materials}
          loading={loading}
          onSelect={(item) => Alert.alert('Download', `Downloading ${item.title}...`)}
        />
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
  statsCard: {
    marginTop: 8,
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
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default MarketingHub;