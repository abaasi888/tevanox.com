import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MusicDetail from '../../components/music/MusicDetail';
import Loading from '../../components/common/Loading';
import { useMusic } from '../../hooks/useMusic';

const MusicDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { fetchMusic, selectedMusic, loading } = useMusic();

  useEffect(() => {
    loadMusic();
  }, [id]);

  const loadMusic = async () => {
    await fetchMusic(id);
  };

  const handlePlay = () => {
    if (selectedMusic) {
      navigation.navigate('AudioPlayer', { music: selectedMusic });
    }
  };

  const handleDownload = () => {
    // Download logic
  };

  const handleVideoPress = () => {
    if (selectedMusic?.video_url) {
      navigation.navigate('MusicVideo', {
        uri: selectedMusic.video_url,
        title: selectedMusic.title,
        artist: selectedMusic.artist,
      });
    }
  };

  if (loading || !selectedMusic) {
    return <Loading message="Loading music details..." />;
  }

  return (
    <View style={styles.container}>
      <MusicDetail
        music={selectedMusic}
        onPlay={handlePlay}
        onDownload={handleDownload}
        onVideoPress={handleVideoPress}
        onBack={() => navigation.goBack()}
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

export default MusicDetailScreen;