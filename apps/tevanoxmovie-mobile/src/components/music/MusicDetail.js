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

const MusicDetail = ({ music, onPlay, onDownload, onBack, onVideoPress }) => {
  if (!music) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: music.cover_art || 'https://via.placeholder.com/300x300' }}
          style={styles.cover}
          resizeMode="cover"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{music.title}</Text>
        <Text style={styles.artist}>{music.artist}</Text>
        <View style={styles.meta}>
          {music.album && <Text style={styles.metaText}>Album: {music.album}</Text>}
          {music.release_year && (
            <Text style={styles.metaText}>• {music.release_year}</Text>
          )}
          {music.duration && (
            <Text style={styles.metaText}>
              • {Math.floor(music.duration / 60)}:
              {String(music.duration % 60).padStart(2, '0')}
            </Text>
          )}
        </View>
        {music.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{music.category}</Text>
          </View>
        )}
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

      {music.video_url && (
        <TouchableOpacity style={styles.videoButton} onPress={onVideoPress}>
          <Icon name="play-circle-filled" size={24} color="#FF4757" />
          <Text style={styles.videoText}>Watch Music Video</Text>
        </TouchableOpacity>
      )}

      {music.genre && music.genre.length > 0 && (
        <View style={styles.genreContainer}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <View style={styles.genreList}>
            {music.genre.map((g, i) => (
              <View key={i} style={styles.genreTag}>
                <Text style={styles.genreText}>{g}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {music.producer && (
        <View style={styles.producerContainer}>
          <Text style={styles.sectionTitle}>Producer</Text>
          <Text style={styles.producerText}>{music.producer}</Text>
        </View>
      )}
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
    height: width,
  },
  info: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    color: '#aaa',
    fontSize: 18,
    marginTop: 4,
    textAlign: 'center',
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
  },
  metaText: {
    color: '#888',
    fontSize: 14,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
  },
  categoryText: {
    color: '#FF4757',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
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
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a3e',
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4757',
  },
  videoText: {
    color: '#FF4757',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  genreContainer: {
    padding: 16,
  },
  genreList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  producerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  producerText: {
    color: '#aaa',
    fontSize: 14,
  },
});

export default MusicDetail;