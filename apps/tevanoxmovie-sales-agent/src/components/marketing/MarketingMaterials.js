import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MarketingMaterials = ({ materials, onSelect, loading = false }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.loadingItem}>
            <View style={[styles.placeholder, { width: 44, height: 44, borderRadius: 8 }]} />
            <View style={styles.loadingInfo}>
              <View style={[styles.placeholder, { width: '60%', height: 14 }]} />
              <View style={[styles.placeholder, { width: '40%', height: 10, marginTop: 4 }]} />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No marketing materials available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.materialItem}
      onPress={() => onSelect && onSelect(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color || '#9C27B0' }]}>
        <Icon name={item.icon || 'description'} size={24} color="#fff" />
      </View>
      <View style={styles.materialInfo}>
        <Text style={styles.materialTitle}>{item.title}</Text>
        <Text style={styles.materialDesc}>{item.description}</Text>
        {item.size && (
          <Text style={styles.materialSize}>{item.size}</Text>
        )}
      </View>
      <Icon name="download" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={materials}
      keyExtractor={(item, index) => item.id || `material-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  materialDesc: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  materialSize: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
  loadingContainer: {
    padding: 16,
  },
  loadingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  placeholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
  },
});

export default MarketingMaterials;