import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MusicCard = ({ music, onPress, width = 140 }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width }]}
      onPress={() => onPress(music)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: music.cover_art || 'https://via.placeholder.com/140x140' }}
        style={[styles.cover, { width, height: width }]}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {music.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {music.artist}
        </Text>
        {music.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{music.category}</Text>
          </View>
        )}
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
  cover: {
    borderRadius: 8,
  },
  info: {
    padding: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  artist: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  categoryText: {
    color: '#FF4757',
    fontSize: 10,
  },
});

export default MusicCard;