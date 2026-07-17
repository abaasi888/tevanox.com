import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMovies } from '../../hooks/useMovies';
import { useMusic } from '../../hooks/useMusic';
import { useSeries } from '../../hooks/useSeries';
import MovieCard from '../../components/movie/MovieCard';
import MusicCard from '../../components/music/MusicCard';
import CategoryTabs from '../../components/common/CategoryTabs';

const categories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'ugandan', label: '🇺🇬 Ugandan', icon: '🇺🇬' },
  { id: 'english', label: '🌍 English', icon: '🌍' },
  { id: 'luganda_translated', label: '🗣️ Luganda', icon: '🗣️' },
  { id: 'swahili_translated', label: '🗣️ Swahili', icon: '🗣️' },
];

const contentTypes = [
  { id: 'movies', label: '🎬 Movies' },
  { id: 'series', label: '📺 Series' },
  { id: 'music', label: '🎵 Music' },
];

const Browse = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('movies');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { getMoviesByCategory, searchMovies } = useMovies();
  const { getMusicByCategory } = useMusic();
  const { getSeriesByCategory } = useSeries();

  useEffect(() => {
    loadContent();
  }, [selectedCategory, selectedType]);

  const loadContent = async () => {
    setLoading(true);
    try {
      let data = [];
      if (selectedType === 'movies') {
        data = selectedCategory === 'all' 
          ? await getMoviesByCategory(null) 
          : await getMoviesByCategory(selectedCategory);
      } else if (selectedType === 'series') {
        data = selectedCategory === 'all' 
          ? await getSeriesByCategory(null) 
          : await getSeriesByCategory(selectedCategory);
      } else if (selectedType === 'music') {
        data = selectedCategory === 'all' 
          ? await getMusicByCategory(null) 
          : await getMusicByCategory(selectedCategory);
      }
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadContent();
      return;
    }
    setLoading(true);
    try {
      let data = [];
      if (selectedType === 'movies') {
        data = await searchMovies(searchQuery);
      }
      setContent(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    if (selectedType === 'movies' || selectedType === 'series') {
      return (
        <MovieCard
          movie={item}
          onPress={() =>
            navigation.navigate(
              selectedType === 'movies' ? 'MovieDetail' : 'SeriesDetail',
              { id: item.id }
            )
          }
          width={160}
        />
      );
    } else if (selectedType === 'music') {
      return (
        <MusicCard
          music={item}
          onPress={() => navigation.navigate('MusicDetail', { id: item.id })}
          width={160}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content Type Tabs */}
      <View style={styles.typeContainer}>
        {contentTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeTab,
              selectedType === type.id && styles.typeTabActive,
            ]}
            onPress={() => setSelectedType(type.id)}
          >
            <Text
              style={[
                styles.typeText,
                selectedType === type.id && styles.typeTextActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Content Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4757" />
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      ) : content.length > 0 ? (
        <FlatList
          data={content}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>😕</Text>
          <Text style={styles.emptyTitle}>No content found</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  searchButton: {
    padding: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typeTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#2a2a3e',
  },
  typeTabActive: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  typeText: {
    color: '#888',
    fontSize: 14,
  },
  typeTextActive: {
    color: '#FF4757',
    fontWeight: '600',
  },
  loadingContainer: {
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

export default Browse;