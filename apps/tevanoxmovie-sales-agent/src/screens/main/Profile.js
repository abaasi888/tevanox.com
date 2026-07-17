import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const Profile = ({ navigation }) => {
  const { agent, logout } = useAgent();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    full_name: agent?.full_name || '',
    phone: agent?.phone || '',
    email: agent?.email || '',
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

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

  const handleUpdateProfile = () => {
    // Update profile logic
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const menuItems = [
    {
      id: 'team',
      icon: 'people',
      label: 'My Team',
      onPress: () => navigation.navigate('MyTeam'),
    },
    {
      id: 'earnings',
      icon: 'trending-up',
      label: 'Earnings',
      onPress: () => navigation.navigate('Earnings'),
    },
    {
      id: 'withdraw',
      icon: 'account-balance-wallet',
      label: 'Withdraw',
      onPress: () => navigation.navigate('Withdraw'),
    },
    {
      id: 'marketing',
      icon: 'campaign',
      label: 'Marketing Hub',
      onPress: () => navigation.navigate('MarketingHub'),
    },
    {
      id: 'settings',
      icon: 'settings',
      label: 'Settings',
      onPress: () => {},
    },
    {
      id: 'help',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => {},
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About TevanoxMovie',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👤 Profile</Text>
        <TouchableOpacity onPress={() => setShowEditModal(true)}>
          <Icon name="edit" size={24} color="#9C27B0" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: agent?.profile_pic || 'https://via.placeholder.com/80' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatar}>
            <Icon name="camera-alt" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{agent?.full_name || 'Agent'}</Text>
        <Text style={styles.code}>Agent Code: {agent?.agent_code}</Text>
        <View style={styles.tierBadge}>
          <Text style={styles.tierText}>Tier {agent?.tier || 1}</Text>
        </View>
      </View>

      <Card variant="elevated">
        <View style={styles.infoRow}>
          <Icon name="email" size={20} color="#888" />
          <Text style={styles.infoText}>{agent?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color="#888" />
          <Text style={styles.infoText}>{agent?.phone || 'Not set'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="people" size={20} color="#888" />
          <Text style={styles.infoText}>
            {agent?.total_referrals || 0} Referrals
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="account-balance-wallet" size={20} color="#888" />
          <Text style={styles.infoText}>
            UGX {(agent?.wallet_balance || 0).toLocaleString()}
          </Text>
        </View>
      </Card>

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

      <Text style={styles.version}>TevanoxMovie Sales Agent v1.0.0</Text>

      <Modal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <Input
          label="Full Name"
          value={editData.full_name}
          onChangeText={(text) => setEditData({ ...editData, full_name: text })}
          placeholder="Enter your full name"
        />
        <Input
          label="Phone"
          value={editData.phone}
          onChangeText={(text) => setEditData({ ...editData, phone: text })}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
        <Input
          label="Email"
          value={editData.email}
          onChangeText={(text) => setEditData({ ...editData, email: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          title="Update Profile"
          onPress={handleUpdateProfile}
          style={styles.updateButton}
          fullWidth
        />
      </Modal>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
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
    backgroundColor: '#9C27B0',
    padding: 4,
    borderRadius: 12,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  code: {
    color: '#9C27B0',
    fontSize: 14,
    marginTop: 4,
  },
  tierBadge: {
    marginTop: 8,
    backgroundColor: '#9C27B0',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  menuContainer: {
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    borderRadius: 12,
    marginTop: 16,
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
  updateButton: {
    marginTop: 16,
  },
});

export default Profile;