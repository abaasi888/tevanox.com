import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MusicCard from '../../components/music/MusicCard';
import { useMusic } from '../../hooks/useMusic';
import CategoryTabs from '../../components/common/CategoryTabs';

const categories = [
  { id: 'all', label: 'All', icon: '🎵' },
  { id: 'ugandan', label: '🇺🇬 Ugandan', icon: '🇺🇬' },
  { id: 'international', label: '🌍 International', icon: '🌍' },
];

const MusicListScreen = ({ route, navigation }) => {
  const { type, category: initialCategory } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getMusicByCategory, fetchTrendingMusic, fetchLatestMusic } = useMusic();

  useEffect(() => {
    loadMusic();
  }, [selectedCategory, type]);

  const loadMusic = async () => {
    setLoading(true);
    try {
      let data = [];
      if (type === 'trending') {
        const response = await fetchTrendingMusic();
        data = response;
      } else if (type === 'latest') {
        const response = await fetchLatestMusic();
        data = response;
      } else {
        data = await getMusicByCategory(selectedCategory);
      }
      setMusic(data);
    } catch (error) {
      console.error('Error loading music:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === 'trending') return 'Trending Music';
    if (type === 'latest') return 'Latest Music';
    const category = categories.find(c => c.id === selectedCategory);
    return category ? `${category.label} Music` : 'Music';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={{ width: 28 }} />
      </View>

      {!type && (
        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      )}

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF4757" />
          <Text style={styles.loadingText}>Loading music...</Text>
        </View>
      ) : music.length > 0 ? (
        <FlatList
          data={music}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MusicCard
              music={item}
              onPress={() => navigation.navigate('MusicDetail', { id: item.id })}
              width={160}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎵</Text>
          <Text style={styles.emptyTitle}>No Music Found</Text>
          <Text style={styles.emptyText}>
            Try changing your filters or check back later
          </Text>
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
  grid: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 48,
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
});

export default MusicListScreen;