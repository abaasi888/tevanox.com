import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AudioPlayer = ({
  music,
  onClose,
  onNext,
  onPrevious,
  isPlaying: initialPlaying = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(initialPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [isPlaying]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    setCurrentTime(value);
  };

  return (
    <Animated.View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="keyboard-arrow-down" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity>
          <Icon name="more-vert" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.coverContainer}>
        <Animated.Image
          source={{ uri: music?.cover_art || 'https://via.placeholder.com/300x300' }}
          style={[styles.cover, { transform: [{ rotate: spin }] }]}
          resizeMode="cover"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{music?.title || 'Unknown'}</Text>
        <Text style={styles.artist}>{music?.artist || 'Unknown Artist'}</Text>
        {music?.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{music.category}</Text>
          </View>
        )}
      </View>

      <View style={styles.progress}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          value={currentTime}
          maximumValue={duration || 180}
          minimumTrackTintColor="#FF4757"
          maximumTrackTintColor="#333"
          thumbTintColor="#FF4757"
          onSlidingComplete={handleSeek}
          disabled={isLoading}
        />
        <Text style={styles.timeText}>{formatTime(duration || 180)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="shuffle" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPrevious}>
          <Icon name="skip-previous" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlayPause}
          disabled={isLoading}
        >
          <Icon
            name={isPlaying ? 'pause' : 'play-arrow'}
            size={44}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext}>
          <Icon name="skip-next" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="repeat" size={24} color="#888" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#aaa',
    fontSize: 14,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cover: {
    width: width - 80,
    height: width - 80,
    borderRadius: 12,
  },
  info: {
    alignItems: 'center',
    marginVertical: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    color: '#888',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,71,87,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  categoryText: {
    color: '#FF4757',
    fontSize: 12,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  slider: {
    flex: 1,
    marginHorizontal: 12,
  },
  timeText: {
    color: '#888',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#FF4757',
    padding: 16,
    borderRadius: 40,
    marginHorizontal: 24,
  },
});

export default AudioPlayer;