import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RankCard = ({ rankInfo, onPress }) => {
  if (!rankInfo) return null;

  const { current_rank, next_rank, progress_percentage } = rankInfo;
  const rank = current_rank || { name: 'Bronze', level: 1, color: '#CD7F32', icon: '🥉' };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={[styles.rankBadge, { backgroundColor: rank.color || '#CD7F32' }]}>
          <Text style={styles.rankIcon}>{rank.icon || '🥉'}</Text>
        </View>
        <View style={styles.rankInfo}>
          <Text style={styles.rankName}>{rank.name || 'Bronze'}</Text>
          <Text style={styles.rankLevel}>Level {rank.level || 1}</Text>
        </View>
        <View style={styles.commissionBadge}>
          <Text style={styles.commissionText}>
            {rank.commission_rate || 15}%
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(progress_percentage || 0, 100)}%`,
                backgroundColor: rank.color || '#CD7F32',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progress_percentage || 0)}%
        </Text>
      </View>

      {next_rank && (
        <View style={styles.nextRankContainer}>
          <Text style={styles.nextRankText}>
            Next: {next_rank.name} • {next_rank.referrals_needed || 0} more referrals needed
          </Text>
        </View>
      )}

      <View style={styles.benefitsRow}>
        <View style={styles.benefitItem}>
          <Icon name="attach-money" size={16} color="#4CAF50" />
          <Text style={styles.benefitText}>
            {rank.commission_rate || 15}% Commission
          </Text>
        </View>
        <View style={styles.benefitItem}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.benefitText}>
            {rank.override_rate || 0}% Override
          </Text>
        </View>
        <View style={styles.benefitItem}>
          <Icon name="emoji-events" size={16} color="#FF9800" />
          <Text style={styles.benefitText}>
            UGX {(rank.monthly_bonus || 0).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankIcon: {
    fontSize: 28,
  },
  rankInfo: {
    flex: 1,
    marginLeft: 12,
  },
  rankName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rankLevel: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  commissionBadge: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  commissionText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
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
  nextRankContainer: {
    marginTop: 8,
  },
  nextRankText: {
    color: '#9C27B0',
    fontSize: 12,
  },
  benefitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default RankCard;