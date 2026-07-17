import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useDashboard } from '../../hooks/useDashboard';
import { useNetwork } from '../../hooks/useNetwork';
import StatsCard from '../../components/dashboard/StatsCard';
import TeamTree from '../../components/dashboard/TeamTree';
import ReferralList from '../../components/dashboard/ReferralList';

const MyTeam = ({ navigation }) => {
  const { refreshDashboard, loading: agentLoading } = useAgent();
  const { referrals, loading } = useDashboard();
  const { tree, teamStats, loading: networkLoading } = useNetwork();
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'tree'

  useEffect(() => {
    refreshDashboard();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  const activeReferrals = referrals?.filter(r => r.is_active).length || 0;
  const inactiveReferrals = referrals?.filter(r => !r.is_active).length || 0;

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9C27B0" />
        <Text style={styles.loadingText}>Loading team...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👥 My Team</Text>
        <TouchableOpacity onPress={() => setViewMode(viewMode === 'list' ? 'tree' : 'list')}>
          <Icon
            name={viewMode === 'list' ? 'account-tree' : 'view-list'}
            size={24}
            color="#9C27B0"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{referrals?.length || 0}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{activeReferrals}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{inactiveReferrals}</Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{teamStats?.total_agents || 0}</Text>
          <Text style={styles.statLabel}>Agents</Text>
        </View>
      </View>

      {viewMode === 'tree' && tree ? (
        <ScrollView
          style={styles.treeContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <TeamTree
            data={tree}
            onSelect={(node) => {
              if (node.type === 'agent') {
                navigation.navigate('AgentDetail', { id: node.id });
              }
            }}
          />
        </ScrollView>
      ) : (
        <ReferralList
          referrals={referrals}
          onPress={(item) => navigation.navigate('UserDetail', { id: item.id })}
          loading={loading}
        />
      )}

      {referrals && referrals.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>👥</Text>
          <Text style={styles.emptyTitle}>No Team Members</Text>
          <Text style={styles.emptyText}>
            Start sharing your referral link to build your team
          </Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => navigation.navigate('Share')}
          >
            <Text style={styles.shareText}>Share Now</Text>
          </TouchableOpacity>
        </View>
      )}
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
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  treeContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: '#9C27B0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MyTeam;