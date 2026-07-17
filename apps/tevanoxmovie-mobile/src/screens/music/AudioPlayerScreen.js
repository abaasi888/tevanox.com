import React from 'react';
import { View, StyleSheet } from 'react-native';
import AudioPlayer from '../../components/music/AudioPlayer';

const AudioPlayerScreen = ({ route, navigation }) => {
  const { music } = route.params;

  return (
    <View style={styles.container}>
      <AudioPlayer
        music={music}
        onClose={() => navigation.goBack()}
        onNext={() => {}}
        onPrevious={() => {}}
        isPlaying={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    justifyContent: 'flex-end',
  },
});

export default AudioPlayerScreen;