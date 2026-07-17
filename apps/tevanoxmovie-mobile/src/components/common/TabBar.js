import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    Home: 'home',
    Browse: 'search',
    Downloads: 'download',
    Profile: 'person',
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Icon
              name={icons[route.name] || 'circle'}
              size={26}
              color={isFocused ? '#FF4757' : '#666'}
            />
            <Text
              style={[
                styles.label,
                isFocused && styles.labelFocused,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    paddingBottom: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  label: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },
  labelFocused: {
    color: '#FF4757',
  },
});

export default TabBar;