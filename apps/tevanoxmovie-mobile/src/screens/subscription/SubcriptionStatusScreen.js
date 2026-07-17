import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SubscriptionStatusScreen = ({ route, navigation }) => {
  const { success } = route.params || { success: true };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon
            name={success ? 'check-circle' : 'cancel'}
            size={80}
            color={success ? '#4CAF50' : '#FF4757'}
          />
        </View>

        <Text style={styles.title}>
          {success ? 'Subscription Activated!' : 'Subscription Failed'}
        </Text>

        <Text style={styles.message}>
          {success
            ? 'You now have full access to all movies, series, and music. Start watching now!'
            : 'Something went wrong. Please try again or contact support.'}
        </Text>

        <View style={styles.features}>
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
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        >
          <Text style={styles.buttonText}>
            {success ? 'Start Watching' : 'Try Again'}
          </Text>
        </TouchableOpacity>

        {success && (
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Browse')}
          >
            <Text style={styles.secondaryButtonText}>Browse Content</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  features: {
    width: '100%',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
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
  button: {
    backgroundColor: '#FF4757',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4757',
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SubscriptionStatusScreen;