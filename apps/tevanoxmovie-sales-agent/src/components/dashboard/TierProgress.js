import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TierProgress = ({ 
  currentTier, 
  nextTier, 
  progress, 
  usersNeeded, 
  totalUsers,
  loading = false 
}) => {
  const tiers = [
    { level: 1, name: 'Tier 1', minUsers: 0, maxUsers: 100, color: '#4CAF50' },
    { level: 2, name: 'Tier 2', minUsers: 101, maxUsers: 500, color: '#2196F3' },
    { level: 3, name: 'Tier 3', minUsers: 501, maxUsers: 999, color: '#FF9800' },
    { level: 4, name: 'Tier 4', minUsers: 1000, maxUsers: Infinity, color: '#9C27B0' },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.placeholder, { height: 80 }]} />
      </View>
    );
  }

  const getCurrentTierInfo = () => {
    return tiers.find(t => t.level === currentTier) || tiers[0];
  };

  const getNextTierInfo = () => {
    return tiers.find(t => t.level === nextTier) || null;
  };

  const current = getCurrentTierInfo();
  const next = getNextTierInfo();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tier Progress</Text>
        <View style={[styles.tierBadge, { backgroundColor: current.color }]}>
          <Text style={styles.tierText}>{current.name}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(progress, 100)}%`, backgroundColor: current.color }
            ]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
      </View>

      {next && (
        <View style={styles.nextTierInfo}>
          <Text style={styles.nextTierText}>
            {usersNeeded} more users needed for {next.name}
          </Text>
          <Text style={styles.userCount}>{totalUsers} / {next.minUsers} users</Text>
        </View>
      )}

      {currentTier === 4 && (
        <View style={styles.maxTierContainer}>
          <Icon name="stars" size={20} color="#FFD700" />
          <Text style={styles.maxTierText}>🎉 You're at the highest tier!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#2a2a3e',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    color: '#aaa',
    fontSize: 12,
    minWidth: 40,
  },
  nextTierInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  nextTierText: {
    color: '#888',
    fontSize: 12,
  },
  userCount: {
    color: '#888',
    fontSize: 12,
  },
  maxTierContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: 8,
  },
  maxTierText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  placeholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
});

export default TierProgress;