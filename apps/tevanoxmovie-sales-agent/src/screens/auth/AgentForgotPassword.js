import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { agentForgotPassword } from '../../api/auth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AgentForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!email) validationErrors.email = 'Email is required';
    if (!email.includes('@')) validationErrors.email = 'Please enter a valid email';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setLoading(true);
    try {
      await agentForgotPassword(email);
      setSent(true);
      Alert.alert(
        'Password Reset',
        'We have sent a password reset link to your email. Please check your inbox.',
        [{ text: 'OK', onPress: () => navigation.navigate('AgentLogin') }]
      );
    } catch (error) {
      Alert.alert('Error', error.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backText}> Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>🔐</Text>
          </View>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="email"
          />

          <Button
            title="Send Reset Link"
            onPress={handleSubmit}
            loading={loading}
            style={styles.resetButton}
            size="large"
            fullWidth
          />

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('AgentLogin')}
          >
            <Text style={styles.loginText}>
              ← Back to Sign In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Icon name="info" size={20} color="#FFD700" />
          <Text style={styles.infoText}>
            💡 If you don't receive the email within 5 minutes, please check your spam folder.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0033',
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: '#aaa',
    fontSize: 16,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(156,39,176,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  resetButton: {
    marginTop: 20,
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#9C27B0',
    fontSize: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 16,
    backgroundColor: 'rgba(255,215,0,0.05)',
    borderRadius: 8,
  },
  infoText: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});

export default AgentForgotPassword;