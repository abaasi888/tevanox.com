import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const MoviePlayer = ({ uri, onBack, title, streaming = true }) => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => setPaused(!paused);
  const toggleFullscreen = () => setFullscreen(!fullscreen);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleLoad = (data) => {
    setDuration(data.duration);
    setLoading(false);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handleEnd = () => {
    setPaused(true);
    setCurrentTime(0);
    videoRef.current.seek(0);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.videoContainer}
        onPress={toggleControls}
        activeOpacity={1}
      >
        <Video
          ref={videoRef}
          source={{
            uri: uri,
            type: streaming ? 'm3u8' : 'mp4',
          }}
          style={styles.video}
          paused={paused}
          onLoad={handleLoad}
          onLoadStart={() => setLoading(true)}
          onProgress={handleProgress}
          onEnd={handleEnd}
          resizeMode="contain"
          controls={false}
          fullscreen={fullscreen}
          onFullscreenPlayerWillPresent={() => setFullscreen(true)}
          onFullscreenPlayerWillDismiss={() => setFullscreen(false)}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4757" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {showControls && (
          <View style={styles.controls}>
            <View style={styles.topControls}>
              <Text style={styles.titleText}>{title || 'Now Playing'}</Text>
              <TouchableOpacity onPress={toggleFullscreen}>
                <Icon
                  name={fullscreen ? 'fullscreen-exit' : 'fullscreen'}
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomControls}>
              <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
                <Icon
                  name={paused ? 'play-arrow' : 'pause'}
                  size={40}
                  color="#fff"
                />
              </TouchableOpacity>

              <View style={styles.progressContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${(currentTime / duration) * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
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
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomControls: {
    marginBottom: 20,
  },
  playButton: {
    alignSelf: 'center',
    padding: 16,
    backgroundColor: 'rgba(255,71,87,0.8)',
    borderRadius: 40,
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginHorizontal: 12,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#FF4757',
    borderRadius: 2,
  },
  timeText: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default MoviePlayer;