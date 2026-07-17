import React from 'react';
import { View, StyleSheet } from 'react-native';
import MoviePlayer from '../../components/movie/MoviePlayer';

const MoviePlayerScreen = ({ route, navigation }) => {
  const { uri, title, streaming } = route.params;

  return (
    <View style={styles.container}>
      <MoviePlayer
        uri={uri}
        title={title}
        streaming={streaming !== false}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default MoviePlayerScreen;