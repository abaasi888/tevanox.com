import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MovieDetail from '../../components/movie/MovieDetail';
import Loading from '../../components/common/Loading';
import { useMovies } from '../../hooks/useMovies';
import { useDownloads } from '../../hooks/useDownloads';
import { useAuth } from '../../hooks/useAuth';

const MovieDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { fetchMovie, selectedMovie, loading } = useMovies();
  const { downloadMovie } = useDownloads();
  const { user } = useAuth();

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    await fetchMovie(id);
  };

  const handlePlay = () => {
    if (selectedMovie) {
      navigation.navigate('MoviePlayer', {
        uri: selectedMovie.video_url,
        title: selectedMovie.title,
        streaming: true,
      });
    }
  };

  const handleDownload = async () => {
    if (!user?.is_active) {
      Alert.alert('Subscription Required', 'Please subscribe to download movies.');
      return;
    }
    await downloadMovie(id);
  };

  const handleVJPress = () => {
    if (selectedMovie?.vj_id) {
      navigation.navigate('VJProfile', { vjId: selectedMovie.vj_id });
    }
  };

  if (loading || !selectedMovie) {
    return <Loading message="Loading movie details..." />;
  }

  return (
    <View style={styles.container}>
      <MovieDetail
        movie={selectedMovie}
        onPlay={handlePlay}
        onDownload={handleDownload}
        onBack={() => navigation.goBack()}
        onVJPress={handleVJPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
});

export default MovieDetailScreen;