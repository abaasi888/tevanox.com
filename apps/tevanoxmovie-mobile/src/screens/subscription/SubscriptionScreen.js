import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SubscriptionPlans from '../../components/subscription/SubscriptionPlans';
import SubscriptionStatus from '../../components/subscription/SubscriptionStatus';
import Loading from '../../components/common/Loading';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useAuth } from '../../hooks/useAuth';

const SubscriptionScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { plans, subscription, loading, fetchPlans, fetchStatus } = useSubscriptions();
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await Promise.all([fetchPlans(), fetchStatus()]);
    if (plans.length > 0) {
      setSelectedPlan(plans[0].id);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a plan');
      return;
    }

    const plan = plans.find((p) => p.id === selectedPlan);
    navigation.navigate('Payment', { plan });
  };

  if (loading) {
    return <Loading message="Loading subscription options..." />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💳 Subscription</Text>
        <View style={{ width: 28 }} />
      </View>

      <SubscriptionStatus subscription={subscription} />

      <View style={styles.plansSection}>
        <Text style={styles.sectionTitle}>Choose Your Plan</Text>
        <Text style={styles.sectionSubtitle}>
          Get unlimited access to all movies, series, and music
        </Text>

        <SubscriptionPlans
          plans={plans}
          selected={selectedPlan}
          onSelect={setSelectedPlan}
        />

        <TouchableOpacity
          style={[
            styles.subscribeButton,
            !selectedPlan && styles.disabledButton,
          ]}
          onPress={handleSubscribe}
          disabled={!selectedPlan}
        >
          <Text style={styles.subscribeText}>Subscribe Now</Text>
        </TouchableOpacity>

        <View style={styles.featuresList}>
          <Text style={styles.featuresTitle}>✨ What you get:</Text>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Unlimited movies & series</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Download for offline viewing</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Ad-free experience</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Exclusive content</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Cancel anytime</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By subscribing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
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
  plansSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: '#FF4757',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  subscribeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresList: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
  },
  featuresTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
  },
  footer: {
    marginTop: 20,
    padding: 16,
  },
  footerText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SubscriptionScreen;