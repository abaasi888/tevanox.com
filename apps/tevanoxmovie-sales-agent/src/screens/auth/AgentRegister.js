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
import { useAgent } from '../../hooks/useAgent';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const AgentRegister = ({ navigation }) => {
  const { register, loading } = useAgent();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referral_code: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!formData.full_name) validationErrors.full_name = 'Full name is required';
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.phone) validationErrors.phone = 'Phone number is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const result = await register(formData);
    if (result.success) {
      navigation.replace('Main');
    } else {
      Alert.alert('Registration Failed', result.error || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>👔 Become an Agent</Text>
          <Text style={styles.subtitle}>Start earning commissions today</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.full_name}
            onChangeText={(text) => setFormData({...formData, full_name: text})}
            error={errors.full_name}
            icon="person"
          />

          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChangeText={(text) => setFormData({...formData, username: text})}
            error={errors.username}
            icon="person-outline"
          />

          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="email"
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({...formData, phone: text})}
            error={errors.phone}
            keyboardType="phone-pad"
            icon="phone"
          />

          <Input
            label="Password"
            placeholder="Create a password (min 6 characters)"
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
            error={errors.password}
            secureTextEntry={!showPassword}
            icon="lock"
            onIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
            error={errors.confirmPassword}
            secureTextEntry={!showConfirmPassword}
            icon="lock"
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <Input
            label="Referral Code (Optional)"
            placeholder="Enter referral code if you have one"
            value={formData.referral_code}
            onChangeText={(text) => setFormData({...formData, referral_code: text})}
            icon="code"
          />

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our
            </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}> Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.termsText}> and </Text>
            <TouchableOpacity>
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Icon name="info" size={20} color="#FFD700" />
            <Text style={styles.infoText}>
              As a sales agent, you'll earn commissions on every subscription made through your referral link.
            </Text>
          </View>

          <Button
            title="Register as Agent"
            onPress={handleSubmit}
            loading={loading}
            style={styles.registerButton}
            size="large"
            fullWidth
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('AgentLogin')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#9C27B0',
    fontSize: 16,
    marginTop: 4,
  },
  form: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  termsText: {
    color: '#888',
    fontSize: 12,
  },
  termsLink: {
    color: '#9C27B0',
    fontSize: 12,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.05)',
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  infoText: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  registerButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginText: {
    color: '#aaa',
    fontSize: 14,
  },
  loginLink: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AgentRegister;