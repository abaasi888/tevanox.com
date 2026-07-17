import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../hooks/useAuth';
import { useSubscriptions } from '../../hooks/useSubscriptions';

const Profile = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { subscription } = useSubscriptions();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const menuItems = [
    {
      id: 'subscription',
      icon: 'credit-card',
      label: 'My Subscription',
      onPress: () => navigation.navigate('Subscription'),
    },
    {
      id: 'downloads',
      icon: 'download',
      label: 'My Downloads',
      onPress: () => navigation.navigate('Downloads'),
    },
    {
      id: 'favorites',
      icon: 'favorite',
      label: 'Favorites',
      onPress: () => navigation.navigate('Favorites'),
    },
    {
      id: 'watch-history',
      icon: 'history',
      label: 'Watch History',
      onPress: () => navigation.navigate('WatchHistory'),
    },
    {
      id: 'settings',
      icon: 'settings',
      label: 'Settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: 'help',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => navigation.navigate('Help'),
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About TevanoxMovie',
      onPress: () => navigation.navigate('About'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image            source={{ uri: user?.profile_pic || 'https://via.placeholder.com/80' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatar}>
            <Icon name="camera-alt" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.username || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@email.com'}</Text>
        <View style={styles.statusBadge}>
          <Icon
            name={user?.is_active ? 'check-circle' : 'cancel'}
            size={16}
            color={user?.is_active ? '#4CAF50' : '#FF4757'}
          />
          <Text
            style={[
              styles.statusText,
              user?.is_active ? styles.statusActive : styles.statusInactive,
            ]}
          >
            {user?.is_active ? 'Active Subscription' : 'No Active Subscription'}
          </Text>
        </View>
      </View>

      {user?.is_active && subscription && (
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Text style={styles.subscriptionTitle}>📺 Current Plan</Text>
            <Text style={styles.subscriptionPlan}>{subscription.plan?.name}</Text>
          </View>
          <View style={styles.subscriptionDetails}>
            <Text style={styles.subscriptionPrice}>
              UGX {subscription.plan?.price?.toLocaleString()}
            </Text>
            <Text style={styles.subscriptionDays}>
              {subscription.days_remaining} days remaining
            </Text>
          </View>
          <View style={styles.subscriptionProgress}>
            <View
              style={[
                styles.progressFill,
                { width: `${((30 - subscription.days_remaining) / 30) * 100}%` },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.renewButton}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={styles.renewText}>Renew Subscription</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Icon name={item.icon} size={24} color="#aaa" />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#FF4757" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>TevanoxMovie v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#1a1a2e',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF4757',
    padding: 4,
    borderRadius: 12,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  email: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statusActive: {
    color: '#4CAF50',
  },
  statusInactive: {
    color: '#FF4757',
  },
  subscriptionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionTitle: {
    color: '#888',
    fontSize: 14,
  },
  subscriptionPlan: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '600',
  },
  subscriptionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  subscriptionPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subscriptionDays: {
    color: '#aaa',
    fontSize: 14,
  },
  subscriptionProgress: {
    height: 4,
    backgroundColor: '#2a2a3e',
    borderRadius: 2,
    marginTop: 12,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#FF4757',
    borderRadius: 2,
  },
  renewButton: {
    marginTop: 12,
    backgroundColor: '#FF4757',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  renewText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  menuLabel: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255,71,87,0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  logoutText: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  version: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Profile;