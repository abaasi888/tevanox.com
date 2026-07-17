import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMovies } from '../../hooks/useMovies';
import { useMusic } from '../../hooks/useMusic';
import { useSeries } from '../../hooks/useSeries';
import MovieCard from '../../components/movie/MovieCard';
import MusicCard from '../../components/music/MusicCard';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('all');
  const { searchMovies } = useMovies();
  const { searchMusic } = useMusic();
  const { searchSeries } = useSeries();

  const searchTypes = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'Series' },
    { id: 'music', label: 'Music' },
  ];

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      let movieResults = [];
      let seriesResults = [];
      let musicResults = [];

      if (searchType === 'all' || searchType === 'movies') {
        movieResults = await searchMovies(text);
      }
      if (searchType === 'all' || searchType === 'series') {
        seriesResults = await searchSeries(text);
      }
      if (searchType === 'all' || searchType === 'music') {
        musicResults = await searchMusic(text);
      }

      const combined = [
        ...movieResults.map((m) => ({ ...m, type: 'movie' })),
        ...seriesResults.map((s) => ({ ...s, type: 'series' })),
        ...musicResults.map((m) => ({ ...m, type: 'music' })),
      ];
      setResults(combined);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    if (item.type === 'movie') {
      return (
        <MovieCard
          movie={item}
          onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
          width={150}
        />
      );
    } else if (item.type === 'series') {
      return (
        <MovieCard
          movie={item}
          onPress={() => navigation.navigate('SeriesDetail', { id: item.id })}
          width={150}
        />
      );
    } else if (item.type === 'music') {
      return (
        <MusicCard
          music={item}
          onPress={() => navigation.navigate('MusicDetail', { id: item.id })}
          width={150}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search movies, series, music..."
            placeholderTextColor="#666"
            value={query}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Icon name="close" size={24} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        {searchTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.filterTab,
              searchType === type.id && styles.filterTabActive,
            ]}
            onPress={() => setSearchType(type.id)}
          >
            <Text
              style={[
                styles.filterText,
                searchType === type.id && styles.filterTextActive,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF4757" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item, index) => `${item.type}-${item.id}-${index}`}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      ) : query.length >= 2 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyEmoji}>😕</Text>
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            Try searching with different keywords
          </Text>
        </View>
      ) : null}
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
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#1a1a2e',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    borderRadius: 8,
    marginLeft: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#2a2a3e',
  },
  filterTabActive: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  filterText: {
    color: '#888',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#FF4757',
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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

export default Search;