import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const MovieDetail = ({ movie, onPlay, onDownload, onBack, onVJPress }) => {
  if (!movie) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: movie.cover_url || movie.poster_url }}
          style={styles.cover}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>{movie.release_year}</Text>
            <Text style={styles.metaText}>•</Text>
            <Text style={styles.metaText}>{movie.duration}m</Text>
            <Text style={styles.metaText}>•</Text>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {movie.average_rating?.toFixed(1) || 'N/A'}
              </Text>
            </View>
          </View>
          {movie.vj_name && (
            <TouchableOpacity style={styles.vjInfo} onPress={onVJPress}>
              <Icon name="mic" size={16} color="#FF4757" />
              <Text style={styles.vjText}>Translated by: {movie.vj_name}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.playButton} onPress={onPlay}>
          <Icon name="play-arrow" size={28} color="#fff" />
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton} onPress={onDownload}>
          <Icon name="download" size={24} color="#FF4757" />
          <Text style={styles.downloadText}>Download</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.description}>{movie.description}</Text>
        <View style={styles.genreContainer}>
          {movie.genre?.map((g, i) => (
            <View key={i} style={styles.genreTag}>
              <Text style={styles.genreText}>{g}</Text>
            </View>
          ))}
        </View>
        {movie.cast && movie.cast.length > 0 && (
          <View style={styles.castContainer}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <Text style={styles.castText}>{movie.cast.join(', ')}</Text>
          </View>
        )}
        {movie.director && (
          <View style={styles.directorContainer}>
            <Text style={styles.sectionTitle}>Director</Text>
            <Text style={styles.directorText}>{movie.director}</Text>
          </View>
        )}
        {movie.category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.sectionTitle}>Category</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{movie.category}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  cover: {
    width: width,
    height: width * 0.6,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  metaText: {
    color: '#aaa',
    fontSize: 14,
    marginRight: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 14,
    marginLeft: 4,
  },
  vjInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  vjText: {
    color: '#FF4757',
    fontSize: 14,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4757',
    paddingVertical: 14,
    borderRadius: 8,
  },
  playText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a3e',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  downloadText: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  info: {
    padding: 16,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    backgroundColor: '#2a2a3e',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#aaa',
    fontSize: 12,
  },
  castContainer: {
    marginBottom: 12,
  },
  castText: {
    color: '#aaa',
    fontSize: 14,
  },
  directorContainer: {
    marginBottom: 12,
  },
  directorText: {
    color: '#aaa',
    fontSize: 14,
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: '#FF4757',
    fontSize: 14,
  },
});

export default MovieDetail;