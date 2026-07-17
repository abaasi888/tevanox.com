import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Register = ({ navigation }) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agent_code: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!formData.username) validationErrors.username = 'Username is required';
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    if (formData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await register(formData);
    if (result.success) {
      navigation.replace('Main');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.title}>🎬 Create Account</Text>
          <Text style={styles.subtitle}>Join TevanoxMovie today</Text>
        </View>
        <View style={styles.form}>
          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            error={errors.username}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            error={errors.password}
            secureTextEntry
          />
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            error={errors.confirmPassword}
            secureTextEntry
          />
          <Input
            label="Agent Code (Optional)"
            placeholder="Enter agent code if you have one"
            value={formData.agent_code}
            onChangeText={(text) => setFormData({ ...formData, agent_code: text })}
          />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By creating an account, you agree to our </Text>
            <TouchableOpacity><Text style={styles.termsLink}>Terms of Service</Text></TouchableOpacity>
            <Text style={styles.termsText}> and </Text>
            <TouchableOpacity><Text style={styles.termsLink}>Privacy Policy</Text></TouchableOpacity>
          </View>
          <Button title="Create Account" onPress={handleSubmit} loading={loading} style={styles.registerButton} />
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  scroll: { flexGrow: 1, padding: 20 },
  header: { marginTop: 40, marginBottom: 30 },
  title: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  subtitle: { color: '#aaa', fontSize: 16, marginTop: 4 },
  form: { flex: 1 },
  termsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 16 },
  termsText: { color: '#888', fontSize: 12 },
  termsLink: { color: '#FF4757', fontSize: 12, fontWeight: '600' },
  registerButton: { marginTop: 10, marginBottom: 20 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  loginText: { color: '#aaa', fontSize: 14 },
  loginLink: { color: '#FF4757', fontSize: 14, fontWeight: '600' },
});

export default Register;