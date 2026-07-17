import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SubscriptionPlans = ({ plans, onSelect, selected }) => {
  const getPlanDetails = (plan) => {
    switch (plan.id) {
      case 'weekly':
        return { icon: 'calendar-today', color: '#4CAF50', bg: 'rgba(76,175,80,0.1)' };
      case 'biweekly':
        return { icon: 'date-range', color: '#2196F3', bg: 'rgba(33,150,243,0.1)' };
      case 'monthly':
        return { icon: 'calendar-month', color: '#FF4757', bg: 'rgba(255,71,87,0.1)' };
      default:
        return { icon: 'calendar-today', color: '#888', bg: 'rgba(136,136,136,0.1)' };
    }
  };

  return (
    <View style={styles.container}>
      {plans.map((plan) => {
        const details = getPlanDetails(plan);
        const isSelected = selected === plan.id;

        return (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.plan,
              isSelected && styles.planSelected,
              { borderColor: details.color },
            ]}
            onPress={() => onSelect(plan.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.planHeader, { backgroundColor: details.bg }]}>
              <Icon name={details.icon} size={24} color={details.color} />
              <Text style={styles.planName}>{plan.name}</Text>
            </View>
            <Text style={styles.planPrice}>
              UGX {plan.price.toLocaleString()}
            </Text>
            <Text style={styles.planDuration}>{plan.duration} days</Text>
            <View style={styles.features}>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.feature}>
                  <Icon name="check-circle" size={16} color="#4CAF50" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            {isSelected && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedText}>Selected</Text>
              </View>
            )}
            {plan.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Popular</Text>
              </View>
            )}
            {plan.savings && (
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>Save {plan.savings}%</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  plan: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  planSelected: {
    borderColor: '#FF4757',
    backgroundColor: 'rgba(255,71,87,0.05)',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  planName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  planPrice: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  planDuration: {
    color: '#888',
    fontSize: 14,
    marginTop: 2,
  },
  features: {
    marginTop: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  featureText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF4757',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
  },
  popularText: {
    color: '#1a1a2e',
    fontSize: 10,
    fontWeight: '700',
  },
  savingsBadge: {
    backgroundColor: 'rgba(76,175,80,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  savingsText: {
    color: '#4CAF50',
    fontSize: 12,
  },
});

export default SubscriptionPlans;