import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDownloads } from '../../hooks/useDownloads';

const Downloads = ({ navigation }) => {
  const { downloads, loading, fetchDownloads, removeDownload } = useDownloads();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDownloads();
    setRefreshing(false);
  };

  const handleRemove = (id) => {
    Alert.alert(
      'Remove Download',
      'Are you sure you want to remove this download?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeDownload(id),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.downloadItem}
      onPress={() => {
        if (item.type === 'movie') {
          navigation.navigate('MoviePlayer', { uri: item.local_uri, title: item.title });
        } else if (item.type === 'series') {
          navigation.navigate('SeriesPlayer', { uri: item.local_uri, title: item.title });
        } else if (item.type === 'music') {
          navigation.navigate('AudioPlayer', { music: item });
        }
      }}
    >
      <Image
        source={{ uri: item.cover_art || item.poster_url || 'https://via.placeholder.com/80' }}
        style={styles.thumbnail}
      />
      <View style={styles.downloadInfo}>
        <Text style={styles.downloadTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.downloadMeta}>
          <Text style={styles.downloadType}>
            {item.type === 'movie'
              ? '🎬 Movie'
              : item.type === 'series'
              ? '📺 Series'
              : '🎵 Music'}
          </Text>
          <Text style={styles.downloadSize}>{item.size}</Text>
        </View>
        <Text style={styles.downloadDate}>
          Downloaded: {new Date(item.downloaded_at).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemove(item.id)}
      >
        <Icon name="delete-outline" size={24} color="#FF4757" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF4757" />
        <Text style={styles.loadingText}>Loading downloads...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📥 My Downloads</Text>
        <Text style={styles.headerCount}>{downloads.length} items</Text>
      </View>

      {downloads.length > 0 ? (
        <FlatList
          data={downloads}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyTitle}>No Downloads</Text>
          <Text style={styles.emptyText}>
            Download movies, series, and music to watch offline
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('Browse')}
          >
            <Text style={styles.browseText}>Browse Content</Text>
          </TouchableOpacity>
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1a1a2e',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCount: {
    color: '#888',
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  downloadItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  downloadInfo: {
    flex: 1,
    marginLeft: 12,
  },
  downloadTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  downloadMeta: {
    flexDirection: 'row',
    marginTop: 4,
  },
  downloadType: {
    color: '#888',
    fontSize: 12,
  },
  downloadSize: {
    color: '#888',
    fontSize: 12,
    marginLeft: 12,
  },
  downloadDate: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  browseButton: {
    marginTop: 20,
    backgroundColor: '#FF4757',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Downloads;