import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useMovies } from '../../hooks/useMovies';
import { useMusic } from '../../hooks/useMusic';
import MovieCard from '../../components/movie/MovieCard';
import MusicCard from '../../components/music/MusicCard';
import Loading from '../../components/common/Loading';

const Home = ({ navigation }) => {
  const { user } = useAuth();
  const { trendingMovies, latestMovies, loading: moviesLoading, fetchMovies } = useMovies();
  const { trendingMusic, loading: musicLoading, fetchMusic } = useMusic();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    await Promise.all([fetchMovies(), fetchMusic()]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (moviesLoading && musicLoading) {
    return <Loading message="Loading entertainment..." />;
  }

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>{user?.username || 'Guest'}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={{ uri: user?.profile_pic || 'https://via.placeholder.com/50' }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.searchBar} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.searchText}>🔍 Search movies, series, music...</Text>
      </TouchableOpacity>

      {!user?.is_active && (
        <TouchableOpacity style={styles.subscriptionBanner} onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.bannerTitle}>🚀 Get Premium Access</Text>
          <Text style={styles.bannerText}>Subscribe now for unlimited access to all content</Text>
          <View style={styles.bannerButton}><Text style={styles.bannerButtonText}>Subscribe Now →</Text></View>
        </TouchableOpacity>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎬 Trending Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Browse', { type: 'movie' })}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={trendingMovies?.slice(0, 10)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetail', { id: item.id })} />}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎵 Trending Music</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Browse', { type: 'music' })}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={trendingMusic?.slice(0, 10)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MusicCard music={item} onPress={() => navigation.navigate('MusicDetail', { id: item.id })} />}
          contentContainerStyle={styles.list}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 40, paddingBottom: 16 },
  greeting: { color: '#888', fontSize: 14 },
  username: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 2 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  searchBar: { backgroundColor: '#2a2a3e', marginHorizontal: 16, padding: 12, borderRadius: 8, marginBottom: 16 },
  searchText: { color: '#666', fontSize: 14 },
  subscriptionBanner: { backgroundColor: '#1a1a2e', marginHorizontal: 16, padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#FF4757' },
  bannerTitle: { color: '#FF4757', fontSize: 18, fontWeight: 'bold' },
  bannerText: { color: '#aaa', fontSize: 14, marginTop: 4 },
  bannerButton: { backgroundColor: '#FF4757', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginTop: 12 },
  bannerButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { marginVertical: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#FF4757', fontSize: 14 },
  list: { paddingHorizontal: 16 },
});

export default Home;