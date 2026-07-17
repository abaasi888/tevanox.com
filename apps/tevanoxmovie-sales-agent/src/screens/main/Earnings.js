import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useDashboard } from '../../hooks/useDashboard';
import StatsCard from '../../components/dashboard/StatsCard';
import EarningsChart from '../../components/dashboard/EarningsChart';

const Earnings = ({ navigation }) => {
  const { refreshDashboard } = useAgent();
  const { stats, earnings, loading } = useDashboard();
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('monthly'); // monthly, yearly, all

  useEffect(() => {
    refreshDashboard();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshDashboard();
    setRefreshing(false);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[
          styles.transactionIcon,
          { backgroundColor: item.type === 'credit' ? 'rgba(76,175,80,0.2)' : 'rgba(255,71,87,0.2)' }
        ]}>
          <Icon
            name={item.type === 'credit' ? 'arrow-downward' : 'arrow-upward'}
            size={20}
            color={item.type === 'credit' ? '#4CAF50' : '#FF4757'}
          />
        </View>
        <View>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <Text style={[
        styles.transactionAmount,
        { color: item.type === 'credit' ? '#4CAF50' : '#FF4757' }
      ]}>
        {item.type === 'credit' ? '+' : '-'} UGX {item.amount.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💰 Earnings</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.statsRow}>
          <StatsCard
            title="Total Earnings"
            value={`UGX ${(stats?.total_earnings || 0).toLocaleString()}`}
            icon="trending-up"
            color="#9C27B0"
          />
          <StatsCard
            title="This Month"
            value={`UGX ${(stats?.monthly_earnings || 0).toLocaleString()}`}
            icon="calendar-month"
            color="#4CAF50"
          />
        </View>

        <View style={styles.statsRow}>
          <StatsCard
            title="Commission Rate"
            value={`${stats?.commission_rate || 0}%`}
            icon="percent"
            color="#FF9800"
          />
          <StatsCard
            title="Active Referrals"
            value={stats?.active_referrals || 0}
            icon="people"
            color="#2196F3"
          />
        </View>

        <EarningsChart
          data={earnings || []}
          title="📊 Earnings Overview"
          loading={loading}
        />

        <View style={styles.filterContainer}>
          {['monthly', 'yearly', 'all'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          {stats?.transactions && stats.transactions.length > 0 ? (
            <FlatList
              data={stats.transactions}
              keyExtractor={(item, index) => item.id || `tx-${index}`}
              renderItem={renderTransaction}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No transactions yet</Text>
            </View>
          )}
        </View>
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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2a2a3e',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: 'rgba(156,39,176,0.2)',
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  filterText: {
    color: '#888',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#9C27B0',
    fontWeight: '600',
  },
  transactionsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionTitle: {
    color: '#fff',
    fontSize: 14,
  },
  transactionDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
});

export default Earnings;