import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useDashboard } from '../../hooks/useDashboard';
import StatsCard from '../../components/dashboard/StatsCard';
import RankCard from '../../components/dashboard/RankCard';
import TierProgress from '../../components/dashboard/TierProgress';
import Loading from '../../components/common/Loading';

const Dashboard = ({ navigation }) => {
  const { agent, refreshDashboard, loading: agentLoading } = useAgent();
  const { stats, loading } = useDashboard();
  const [refreshing, setRefreshing] = useState(false);
  const [rankInfo, setRankInfo] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await refreshDashboard();
    await fetchRankInfo();
  };

  const fetchRankInfo = async () => {
    try {
      // Fetch rank info from API
      const response = await axios.get('/api/v1/agent-ranks/my-rank');
      setRankInfo(response.data);
    } catch (error) {
      console.error('Error fetching rank info:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleShareReferral = async () => {
    const link = `https://tevanox.com/register?ref=${agent?.agent_code}`;
    const message = `🎬 Join TevanoxMovie and get premium entertainment!\n\nUse my referral link: ${link}\n\n🎥 Unlimited Movies, Series & Music\n💰 Subscribe and enjoy!\n\nAgent Code: ${agent?.agent_code}`;
    
    try {
      await Share.share({
        message: message,
        title: 'Share TevanoxMovie',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  if (agentLoading || loading) {
    return <Loading message="Loading dashboard..." />;
  }

  const activeReferrals = stats?.active_referrals || 0;
  const totalReferrals = stats?.total_referrals || 0;
  const currentRank = rankInfo?.current_rank || { name: 'Bronze', level: 1 };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>{agent?.full_name || 'Agent'}</Text>
        </View>
        <View style={[styles.rankBadge, { backgroundColor: currentRank.color || '#9C27B0' }]}>
          <Text style={styles.rankText}>{currentRank.icon || '🥉'} {currentRank.name || 'Bronze'}</Text>
        </View>
      </View>

      {/* Rank Card */}
      <RankCard rankInfo={rankInfo} />

      {/* Agent Code */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Your Referral Code</Text>
        <Text style={styles.code}>{agent?.agent_code}</Text>
        <TouchableOpacity style={styles.shareCodeButton} onPress={handleShareReferral}>
          <Icon name="share" size={20} color="#9C27B0" />
          <Text style={styles.shareCodeText}>Share Code</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatsCard
          title="Active Referrals"
          value={activeReferrals}
          icon="people"
          color="#4CAF50"
          subtitle={`${totalReferrals} total`}
        />
        <StatsCard
          title="Wallet Balance"
          value={`UGX ${(stats?.wallet_balance || 0).toLocaleString()}`}
          icon="account-balance-wallet"
          color="#FF9800"
        />
      </View>

      <View style={styles.statsRow}>
        <StatsCard
          title="Commission Rate"
          value={`${stats?.commission_rate || 0}%`}
          icon="percent"
          color="#9C27B0"
        />
        <StatsCard
          title="Monthly Bonus"
          value={`UGX ${(stats?.monthly_bonus || 0).toLocaleString()}`}
          icon="trending-up"
          color="#2196F3"
        />
      </View>

      {/* Tier Progress */}
      <TierProgress
        currentTier={agent?.tier || 1}
        nextTier={(agent?.tier || 1) + 1}
        progress={stats?.tier_progress || 0}
        usersNeeded={stats?.users_needed || 0}
        totalUsers={activeReferrals}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>📤 Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#25D366' }]}
            onPress={handleShareReferral}
          >
            <Icon name="share" size={24} color="#fff" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#9C27B0' }]}
            onPress={() => navigation.navigate('RankProgress')}
          >
            <Icon name="trending-up" size={24} color="#fff" />
            <Text style={styles.actionText}>Rank</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
            onPress={() => navigation.navigate('MyTeam')}
          >
            <Icon name="people" size={24} color="#fff" />
            <Text style={styles.actionText}>Team</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#FF9800' }]}
            onPress={() => navigation.navigate('Earnings')}
          >
            <Icon name="attach-money" size={24} color="#fff" />
            <Text style={styles.actionText}>Earnings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Incentives Preview */}
      <View style={styles.incentivesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🏆 Next Incentives</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Incentives')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.incentivesList}>
          {rankInfo?.next_rank && (
            <View style={styles.incentiveItem}>
              <Icon name="emoji-events" size={24} color="#FFD700" />
              <View style={styles.incentiveInfo}>
                <Text style={styles.incentiveName}>Reach {rankInfo.next_rank.name}</Text>
                <Text style={styles.incentiveDesc}>
                  {rankInfo.next_rank.referrals_needed} more referrals needed
                </Text>
              </View>
              <Text style={styles.incentiveValue}>
                UGX {rankInfo.next_rank.total_needed?.toLocaleString()}
              </Text>
            </View>
          )}
          {rankInfo?.next_incentive && (
            <View style={styles.incentiveItem}>
              <Icon name="car" size={24} color="#4CAF50" />
              <View style={styles.incentiveInfo}>
                <Text style={styles.incentiveName}>{rankInfo.next_incentive.name}</Text>
                <Text style={styles.incentiveDesc}>
                  {rankInfo.next_incentive.requirements?.referrals || 0} referrals needed
                </Text>
              </View>
              <Text style={styles.incentiveValue}>
                UGX {rankInfo.next_incentive.value?.toLocaleString()}
              </Text>
            </View>
          )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 16,
  },
  greeting: {
    color: '#888',
    fontSize: 14,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  rankBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rankText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  codeContainer: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  codeLabel: {
    color: '#888',
    fontSize: 12,
  },
  code: {
    color: '#9C27B0',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
    letterSpacing: 2,
  },
  shareCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(156,39,176,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  shareCodeText: {
    color: '#9C27B0',
    marginLeft: 6,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  quickActions: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  incentivesSection: {
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  seeAll: {
    color: '#9C27B0',
    fontSize: 14,
  },
  incentivesList: {
    paddingHorizontal: 16,
  },
  incentiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  incentiveInfo: {
    flex: 1,
    marginLeft: 12,
  },
  incentiveName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  incentiveDesc: {
    color: '#888',
    fontSize: 12,
  },
  incentiveValue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Dashboard;