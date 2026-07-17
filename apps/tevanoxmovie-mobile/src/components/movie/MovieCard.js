import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovieCard = ({ movie, onPress, width = 150, showRating = true }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: movie.poster_url || 'https://via.placeholder.com/150x225' }}
        style={[styles.poster, { width, height: width * 1.5 }]}
        resizeMode="cover"
      />
      {movie.vj_name && (
        <View style={styles.vjBadge}>
          <Text style={styles.vjText}>🎤 {movie.vj_name}</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.year}>{movie.release_year}</Text>
          {showRating && (
            <View style={styles.rating}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>
                {movie.average_rating?.toFixed(1) || 'N/A'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    borderRadius: 8,
  },
  vjBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255,71,87,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  vjText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  info: {
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  year: {
    color: '#888',
    fontSize: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#aaa',
    fontSize: 12,
    marginLeft: 2,
  },
});

export default MovieCard;