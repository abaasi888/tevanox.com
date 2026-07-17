import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentForm from '../../components/subscription/PaymentForm';
import { usePayments } from '../../hooks/usePayments';
import { useSubscriptions } from '../../hooks/useSubscriptions';

const PaymentScreen = ({ route, navigation }) => {
  const { plan } = route.params;
  const [loading, setLoading] = useState(false);
  const { initializePayment } = usePayments();
  const { activateSubscription } = useSubscriptions();

  const handlePayment = async (paymentData) => {
    setLoading(true);
    try {
      const result = await initializePayment({
        ...paymentData,
        amount: plan.price,
        plan_id: plan.id,
      });

      if (result.success) {
        Alert.alert(
          'Payment Initiated',
          `Please check your phone for the payment request.\nReference: ${result.reference}`,
          [
            {
              text: 'OK',
              onPress: async () => {
                const verified = await verifyPayment(result.reference);
                if (verified) {
                  await activateSubscription(plan.id);
                  navigation.navigate('SubscriptionStatus', { success: true });
                }
              },
            },
          ]
        );
      } else {
        Alert.alert('Payment Failed', result.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const result = await verifyPayment(reference);
      return result.success;
    } catch (error) {
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💳 Payment</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.planSummary}>
        <Text style={styles.planName}>{plan.name}</Text>
        <Text style={styles.planPrice}>UGX {plan.price.toLocaleString()}</Text>
        <Text style={styles.planDuration}>{plan.duration} days</Text>
      </View>

      <PaymentForm onSubmit={handlePayment} loading={loading} />
    </View>
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
  planSummary: {
    backgroundColor: '#1a1a2e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  planName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    color: '#FF4757',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  planDuration: {
    color: '#888',
    fontSize: 14,
    marginTop: 4,
  },
});

export default PaymentScreen;