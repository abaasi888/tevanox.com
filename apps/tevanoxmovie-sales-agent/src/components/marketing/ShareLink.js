import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShareLink = ({ agentCode, title = 'Share Referral Link', onShare }) => {
  const shareLink = async () => {
    const link = `https://tevanox.com/register?ref=${agentCode}`;
    try {
      await Share.share({
        message: `🎬 Join TevanoxMovie and get premium entertainment!\n\nUse my referral link: ${link}\n\n🎥 Unlimited Movies, Series & Music\n💰 Special offer for new users!`,
        title: 'Share TevanoxMovie',
      });
      if (onShare) onShare();
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={shareLink} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Icon name="share" size={24} color="#fff" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.code}>Code: {agentCode}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9C27B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  code: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ShareLink;