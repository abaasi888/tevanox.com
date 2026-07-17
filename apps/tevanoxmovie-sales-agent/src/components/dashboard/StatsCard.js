import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatsCard = ({ title, value, icon, color, subtitle, loading = false }) => {
  if (loading) {
    return (
      <View style={[styles.card, { borderLeftColor: color || '#9C27B0' }]}>
        <View style={styles.header}>
          <View style={[styles.iconPlaceholder, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
          <View style={[styles.textPlaceholder, { width: '60%', height: 12 }]} />
        </View>
        <View style={[styles.textPlaceholder, { width: '70%', height: 20, marginTop: 8 }]} />
      </View>
    );
  }

  return (
    <View style={[styles.card, { borderLeftColor: color || '#9C27B0' }]}>
      <View style={styles.header}>
        <Icon name={icon || 'trending-up'} size={24} color={color || '#9C27B0'} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 4,
    borderLeftWidth: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  value: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  textPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
});

export default StatsCard;