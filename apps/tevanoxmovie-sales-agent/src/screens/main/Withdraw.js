import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAgent } from '../../hooks/useAgent';
import { useDashboard } from '../../hooks/useDashboard';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { requestWithdrawal, getWithdrawalSettings } from '../../api/payments';

const Withdraw = ({ navigation }) => {
  const { agent, refreshDashboard } = useAgent();
  const { stats } = useDashboard();
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [settings, setSettings] = useState(null);
  const [recentWithdrawals, setRecentWithdrawals] = useState([]);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getWithdrawalSettings();
      setSettings(response.data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    const amountNum = parseFloat(amount);
    const minWithdrawal = settings?.min_withdrawal || 5000;
    const maxWithdrawal = settings?.max_withdrawal || 10000000;

    if (!amount || amountNum < minWithdrawal) {
      validationErrors.amount = `Minimum withdrawal is UGX ${minWithdrawal.toLocaleString()}`;
    }
    if (amountNum > (agent?.wallet_balance || 0)) {
      validationErrors.amount = 'Insufficient balance';
    }
    if (amountNum > maxWithdrawal) {
      validationErrors.amount = `Maximum withdrawal is UGX ${maxWithdrawal.toLocaleString()}`;
    }
    if (!bankName) validationErrors.bankName = 'Bank name is required';
    if (!accountName) validationErrors.accountName = 'Account name is required';
    if (!accountNumber) validationErrors.accountNumber = 'Account number is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await requestWithdrawal({
        amount: amountNum,
        bank_name: bankName,
        account_name: accountName,
        account_number: accountNumber,
      });
      
      Alert.alert(
        'Success',
        'Withdrawal request submitted successfully. Please allow 1-3 business days for processing.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      await refreshDashboard();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>💰 Withdraw</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.balanceCard} variant="elevated">
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            UGX {(agent?.wallet_balance || 0).toLocaleString()}
          </Text>
          <Text style={styles.balanceNote}>
            Minimum withdrawal: UGX {(settings?.min_withdrawal || 5000).toLocaleString()}
          </Text>
        </Card>

        <View style={styles.form}>
          <Input
            label="Amount (UGX)"
            placeholder="Enter amount to withdraw"
            value={amount}
            onChangeText={setAmount}
            error={errors.amount}
            keyboardType="numeric"
            icon="money"
          />

          <Input
            label="Bank Name"
            placeholder="Enter bank name"
            value={bankName}
            onChangeText={setBankName}
            error={errors.bankName}
            icon="business"
          />

          <Input
            label="Account Name"
            placeholder="Enter account name"
            value={accountName}
            onChangeText={setAccountName}
            error={errors.accountName}
            icon="person"
          />

          <Input
            label="Account Number"
            placeholder="Enter account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            error={errors.accountNumber}
            keyboardType="numeric"
            icon="credit-card"
          />

          <View style={styles.infoBox}>
            <Icon name="info" size={20} color="#FFD700" />
            <Text style={styles.infoText}>
              Withdrawals are processed within 1-3 business days. 
              Make sure your bank details are correct.
            </Text>
          </View>

          <Button
            title="Request Withdrawal"
            onPress={handleSubmit}
            loading={loading}
            style={styles.withdrawButton}
            size="large"
            fullWidth
          />
        </View>

        {recentWithdrawals.length > 0 && (
          <View style={styles.recentSection}>
            <Text style={styles.recentTitle}>Recent Withdrawals</Text>
            {recentWithdrawals.map((item, index) => (
              <View key={index} style={styles.recentItem}>
                <Text style={styles.recentAmount}>
                  UGX {item.amount.toLocaleString()}
                </Text>
                <Text style={styles.recentStatus}>
                  {item.status}
                </Text>
                <Text style={styles.recentDate}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        )}
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
  content: {
    flex: 1,
    padding: 16,
  },
  balanceCard: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9C27B0',
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceNote: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
  },
  form: {
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.1)',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  infoText: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  withdrawButton: {
    marginTop: 8,
  },
  recentSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
  },
  recentTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  recentAmount: {
    color: '#fff',
    fontSize: 14,
  },
  recentStatus: {
    color: '#888',
    fontSize: 12,
  },
  recentDate: {
    color: '#666',
    fontSize: 12,
  },
});

export default Withdraw;