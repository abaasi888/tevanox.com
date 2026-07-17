import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentForm = ({ onSubmit, loading }) => {
  const [method, setMethod] = useState('mobile_money');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [provider, setProvider] = useState('mtn');

  const paymentMethods = [
    { id: 'mobile_money', label: 'Mobile Money', icon: 'phone-android' },
    { id: 'visa', label: 'Visa / Credit Card', icon: 'credit-card' },
  ];

  const providers = [
    { id: 'mtn', label: 'MTN Mobile Money', color: '#FFD700' },
    { id: 'airtel', label: 'Airtel Money', color: '#FF0000' },
    { id: 'africell', label: 'Africell Money', color: '#00FF00' },
  ];

  const handleSubmit = () => {
    if (method === 'mobile_money' && !phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    onSubmit({
      method,
      phone_number: phoneNumber,
      provider,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>

      {paymentMethods.map((pm) => (
        <TouchableOpacity
          key={pm.id}
          style={[
            styles.method,
            method === pm.id && styles.methodActive,
          ]}
          onPress={() => setMethod(pm.id)}
        >
          <Icon name={pm.icon} size={24} color="#fff" />
          <Text style={styles.methodText}>{pm.label}</Text>
          {method === pm.id && (
            <Icon name="check-circle" size={24} color="#4CAF50" />
          )}
        </TouchableOpacity>
      ))}

      {method === 'mobile_money' && (
        <View style={styles.form}>
          <Text style={styles.label}>Mobile Money Provider</Text>
          <View style={styles.providerContainer}>
            {providers.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.provider,
                  provider === p.id && styles.providerActive,
                  { borderColor: p.color },
                ]}
                onPress={() => setProvider(p.id)}
              >
                <Text
                  style={[
                    styles.providerText,
                    provider === p.id && styles.providerTextActive,
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Phone Number"
            placeholder="Enter phone number (e.g., 0777123456)"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            icon="phone"
          />

          <View style={styles.infoBox}>
            <Icon name="info" size={20} color="#FFD700" />
            <Text style={styles.infoText}>
              You will receive a payment request on your phone. Enter your PIN to
              confirm.
            </Text>
          </View>
        </View>
      )}

      <Button
        title="Pay Now"
        onPress={handleSubmit}
        loading={loading}
        style={styles.payButton}
        fullWidth
      />

      <View style={styles.security}>
        <Icon name="security" size={16} color="#4CAF50" />
        <Text style={styles.securityText}>
          Secured by Paystack. Your information is safe.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  method: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  methodActive: {
    borderWidth: 2,
    borderColor: '#FF4757',
    backgroundColor: 'rgba(255,71,87,0.1)',
  },
  methodText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  form: {
    marginTop: 16,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
  providerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  provider: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2a2a3e',
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  providerActive: {
    backgroundColor: 'rgba(255,71,87,0.2)',
  },
  providerText: {
    color: '#888',
    fontSize: 14,
  },
  providerTextActive: {
    color: '#fff',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  payButton: {
    marginTop: 20,
  },
  security: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  securityText: {
    color: '#888',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default PaymentForm;