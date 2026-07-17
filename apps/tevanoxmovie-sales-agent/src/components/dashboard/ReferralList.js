import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ReferralList = ({ referrals, onPress, loading = false }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.loadingItem}>
            <View style={[styles.placeholder, { width: 40, height: 40, borderRadius: 20 }]} />
            <View style={styles.loadingInfo}>
              <View style={[styles.placeholder, { width: '60%', height: 14 }]} />
              <View style={[styles.placeholder, { width: '40%', height: 10, marginTop: 4 }]} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (!referrals || referrals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No referrals yet</Text>
        <Text style={styles.emptySubText}>Start sharing your referral link to build your team</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.referralItem}
      onPress={() => onPress && onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>
          {item.username?.charAt(0).toUpperCase() || '?'}
        </Text>
      </View>
      <View style={styles.referralInfo}>
        <Text style={styles.referralName}>{item.username}</Text>
        <Text style={styles.referralDate}>
          Joined: {new Date(item.created_at).toLocaleDateString()}
        </Text>
        {item.tier && (
          <Text style={styles.referralTier}>Tier {item.tier}</Text>
        )}
      </View>
      <View style={styles.referralStatus}>
        <View style={[
          styles.statusDot,
          item.is_active ? styles.statusActive : styles.statusInactive
        ]} />
        <Text style={[
          styles.statusText,
          item.is_active ? styles.statusActiveText : styles.statusInactiveText
        ]}>
          {item.is_active ? 'Active' : 'Inactive'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={referrals}
      keyExtractor={(item, index) => item.id || `referral-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  referralItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9C27B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  referralInfo: {
    flex: 1,
    marginLeft: 12,
  },
  referralName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  referralDate: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  referralTier: {
    color: '#9C27B0',
    fontSize: 12,
    marginTop: 2,
  },
  referralStatus: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
  },
  statusInactive: {
    backgroundColor: '#FF4757',
  },
  statusText: {
    fontSize: 10,
  },
  statusActiveText: {
    color: '#4CAF50',
  },
  statusInactiveText: {
    color: '#FF4757',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
  emptySubText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  loadingContainer: {
    padding: 16,
  },
  loadingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  placeholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
});

export default ReferralList;