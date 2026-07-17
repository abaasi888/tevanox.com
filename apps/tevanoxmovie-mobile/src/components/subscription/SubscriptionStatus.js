import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SubscriptionStatus = ({ subscription }) => {
  if (!subscription) {
    return (
      <View style={[styles.container, styles.inactive]}>
        <Icon name="cancel" size={24} color="#FF4757" />
        <Text style={styles.statusText}>No active subscription</Text>
        <Text style={styles.subText}>Subscribe to access all content</Text>
      </View>
    );
  }

  const isActive = subscription.is_active;
  const daysRemaining = subscription.days_remaining || 0;

  return (
    <View style={[styles.container, isActive ? styles.active : styles.inactive]}>
      <Icon
        name={isActive ? 'check-circle' : 'cancel'}
        size={24}
        color={isActive ? '#4CAF50' : '#FF4757'}
      />
      <View style={styles.textContainer}>
        <Text style={styles.statusText}>
          {isActive ? 'Active Subscription' : 'Expired'}
        </Text>
        {isActive && (
          <Text style={styles.daysText}>
            {daysRemaining} days remaining
          </Text>
        )}
        {subscription.plan && (
          <Text style={styles.planText}>
            {subscription.plan.name} • UGX{' '}
            {subscription.plan.price.toLocaleString()}
          </Text>
        )}
        {subscription.expiry_date && (
          <Text style={styles.expiryText}>
            Expires: {new Date(subscription.expiry_date).toLocaleDateString()}
          </Text>
        )}
      </View>
      {!isActive && <Icon name="arrow-forward" size={24} color="#FF4757" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
  active: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  inactive: {
    backgroundColor: 'rgba(255, 71, 87, 0.1)',
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  daysText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 2,
  },
  planText: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  expiryText: {
    color: '#888',
    fontSize: 12,
    marginTop: 1,
  },
});

export default SubscriptionStatus;