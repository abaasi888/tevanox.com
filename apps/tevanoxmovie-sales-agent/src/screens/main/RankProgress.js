import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import Loading from '../../components/common/Loading';
import RankCard from '../../components/dashboard/RankCard';

const RankProgress = ({ navigation }) => {
  const { agent, refreshDashboard, loading } = useAgent();
  const [rankInfo, setRankInfo] = useState(null);
  const [rankHistory, setRankHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [allRanks, setAllRanks] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch rank info
      const response = await axios.get('/api/v1/agent-ranks/my-rank');
      setRankInfo(response.data);

      // Fetch all ranks
      const ranksResponse = await axios.get('/api/v1/agent-ranks');
      setAllRanks(ranksResponse.data);

      // Fetch rank history
      const historyResponse = await axios.get('/api/v1/agent-ranks/history');
      setRankHistory(historyResponse.data);
    } catch (error) {
      console.error('Error loading rank data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getRankIcon = (level) => {
    const icons = {
      1: '🥉',
      2: '🥈',
      3: '🥇',
      4: '💎',
      5: '💎',
      6: '💎',
      7: '👑',
    };
    return icons[level] || '⭐';
  };

  const getRankColor = (level) => {
    const colors = {
      1: '#CD7F32',
      2: '#C0C0C0',
      3: '#FFD700',
      4: '#E5E4E2',
      5: '#B9F2FF',
      6: '#B9F2FF',
      7: '#FFD700',
    };
    return colors[level] || '#888';
  };

  if (loading) {
    return <Loading message="Loading rank progress..." />;
  }

  const currentRank = rankInfo?.current_rank || { level: 1, name: 'Bronze' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏆 Rank Progress</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Current Rank Card */}
        <RankCard rankInfo={rankInfo} />

        {/* All Ranks Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Rank Timeline</Text>
          {allRanks.map((rank, index) => {
            const isCurrent = rank.level === currentRank.level;
            const isAchieved = rank.level <= currentRank.level;
            const isNext = rank.level === currentRank.level + 1;

            return (
              <View key={rank.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      {
                        backgroundColor: isAchieved
                          ? getRankColor(rank.level)
                          : '#2a2a3e',
                      },
                    ]}
                  >
                    <Text style={styles.timelineIcon}>
                      {isAchieved ? getRankIcon(rank.level) : '⏳'}
                    </Text>
                  </View>
                  {index < allRanks.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        {
                          backgroundColor: isAchieved
                            ? getRankColor(rank.level)
                            : '#2a2a3e',
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineRight}>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineName}>
                      {rank.name}
                      {isCurrent && (
                        <Text style={styles.currentBadge}> • Current</Text>
                      )}
                      {isNext && (
                        <Text style={styles.nextBadge}> • Next</Text>
                      )}
                    </Text>
                    <Text style={styles.timelineDesc}>
                      {rank.min_referrals} referrals required
                    </Text>
                    {isAchieved && (
                      <Text style={styles.timelineDate}>
                        Achieved: {new Date(rank.achieved_date).toLocaleDateString()}
                      </Text>
                    )}
                    {isNext && (
                      <Text style={styles.timelineProgress}>
                        {rankInfo?.next_rank?.referrals_needed || 0} more needed
                      </Text>
                    )}
                  </View>
                  {isCurrent && (
                    <View style={styles.currentIndicator}>
                      <Text style={styles.currentIndicatorText}>Current</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Rank Benefits */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Rank Benefits</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitCard}>
              <Icon name="attach-money" size={24} color="#4CAF50" />
              <Text style={styles.benefitCardTitle}>Commission</Text>
              <Text style={styles.benefitCardValue}>
                {currentRank.commission_rate || 15}%
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="people" size={24} color="#2196F3" />
              <Text style={styles.benefitCardTitle}>Override</Text>
              <Text style={styles.benefitCardValue}>
                {currentRank.override_rate || 0}%
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="emoji-events" size={24} color="#FF9800" />
              <Text style={styles.benefitCardTitle}>Monthly Bonus</Text>
              <Text style={styles.benefitCardValue}>
                UGX {(currentRank.monthly_bonus || 0).toLocaleString()}
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Icon name="star" size={24} color="#FFD700" />
              <Text style={styles.benefitCardTitle}>One-Time Bonus</Text>
              <Text style={styles.benefitCardValue}>
                UGX {(currentRank.one_time_bonus || 0).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Next Rank Incentives */}
        {rankInfo?.next_rank && (
          <View style={styles.nextIncentivesSection}>
            <Text style={styles.sectionTitle}>🎁 Next Rank Incentives</Text>
            <View style={styles.incentiveCard}>
              <Text style={styles.incentiveTitle}>
                Reach {rankInfo.next_rank.name}
              </Text>
              <View style={styles.incentiveDetails}>
                <View style={styles.incentiveRow}>
                  <Icon name="people" size={20} color="#888" />
                  <Text style={styles.incentiveText}>
                    {rankInfo.next_rank.referrals_needed} more referrals
                  </Text>
                </View>
                <View style={styles.incentiveRow}>
                  <Icon name="attach-money" size={20} color="#4CAF50" />
                  <Text style={styles.incentiveText}>
                    UGX {(rankInfo.next_rank.one_time_bonus || 0).toLocaleString()} bonus
                  </Text>
                </View>
                <View style={styles.incentiveRow}>
                  <Icon name="trending-up" size={20} color="#9C27B0" />
                  <Text style={styles.incentiveText}>
                    {rankInfo.next_rank.commission_rate || 0}% commission rate
                  </Text>
                </View>
                <View style={styles.incentiveRow}>
                  <Icon name="star" size={20} color="#FFD700" />
                  <Text style={styles.incentiveText}>
                    {rankInfo.next_rank.override_rate || 0}% override rate
                  </Text>
                </View>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(rankInfo.progress_percentage || 0, 100)}%`,
                        backgroundColor: getRankColor(rankInfo.next_rank.level),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(rankInfo.progress_percentage || 0)}%
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  timelineSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  timelineLeft: {
    width: 40,
    alignItems: 'center',
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  timelineIcon: {
    fontSize: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginTop: 2,
  },
  timelineRight: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 16,
  },
  timelineContent: {
    flex: 1,
  },
  timelineName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  currentBadge: {
    color: '#4CAF50',
    fontSize: 14,
  },
  nextBadge: {
    color: '#9C27B0',
    fontSize: 14,
  },
  timelineDesc: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  timelineDate: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 2,
  },
  timelineProgress: {
    color: '#FF9800',
    fontSize: 12,
    marginTop: 2,
  },
  currentIndicator: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  currentIndicatorText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  benefitsSection: {
    padding: 16,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  benefitCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  benefitCardTitle: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  benefitCardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  nextIncentivesSection: {
    padding: 16,
    paddingBottom: 32,
  },
  incentiveCard: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(156,39,176,0.3)',
  },
  incentiveTitle: {
    color: '#9C27B0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  incentiveDetails: {
    gap: 8,
  },
  incentiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  incentiveText: {
    color: '#aaa',
    fontSize: 14,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2a2a3e',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    minWidth: 40,
  },
});

export default RankProgress;