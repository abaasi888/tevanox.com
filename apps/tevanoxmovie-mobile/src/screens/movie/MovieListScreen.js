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
import MovieCard from '../../components/movie/MovieCard';
import { useMovies } from '../../hooks/useMovies';
import CategoryTabs from '../../components/common/CategoryTabs';

const categories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'ugandan', label: '🇺🇬 Ugandan', icon: '🇺🇬' },
  { id: 'english', label: '🌍 English', icon: '🌍' },
  { id: 'luganda_translated', label: '🗣️ Luganda', icon: '🗣️' },
  { id: 'swahili_translated', label: '🗣️ Swahili', icon: '🗣️' },
];

const MovieListScreen = ({ route, navigation }) => {
  const { type, category: initialCategory } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getMoviesByCategory, fetchTrendingMovies, fetchLatestMovies } = useMovies();

  useEffect(() => {
    loadMovies();
  }, [selectedCategory, type]);

  const loadMovies = async () => {
    setLoading(true);
    try {
      let data = [];
      if (type === 'trending') {
        const response = await fetchTrendingMovies();
        data = response;
      } else if (type === 'latest') {
        const response = await fetchLatestMovies();
        data = response;
      } else {
        data = await getMoviesByCategory(selectedCategory);
      }
      setMovies(data);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (type === 'trending') return 'Trending Movies';
    if (type === 'latest') return 'Latest Movies';
    const category = categories.find(c => c.id === selectedCategory);
    return category ? `${category.label} Movies` : 'Movies';
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
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      ) : movies.length > 0 ? (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
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
          <Text style={styles.emptyEmoji}>🎬</Text>
          <Text style={styles.emptyTitle}>No Movies Found</Text>
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

export default MovieListScreen;