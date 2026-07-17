import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useShare } from '../../hooks/useShare';

const SocialShare = ({ agentCode, message, onShare }) => {
  const { shareViaWhatsApp, shareViaTelegram, shareGeneral, shareLink } = useShare();

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'phone-android',
      color: '#25D366',
      share: () => shareViaWhatsApp(agentCode, message),
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: 'send',
      color: '#0088cc',
      share: () => shareViaTelegram(agentCode, message),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'facebook',
      color: '#1877F2',
      share: async () => {
        const text = message || `📱 Download TevanoxMovie! Use my agent code: ${agentCode}`;
        try {
          await Linking.openURL(
            `https://www.facebook.com/sharer/sharer.php?u=https://tevanox.com/register?ref=${agentCode}&quote=${encodeURIComponent(text)}`
          );
        } catch {
          Alert.alert('Error', 'Could not open Facebook');
        }
      },
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: 'twitter',
      color: '#1DA1F2',
      share: async () => {
        const text = message || `📱 Download TevanoxMovie! Use my agent code: ${agentCode}`;
        try {
          await Linking.openURL(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=https://tevanox.com/register?ref=${agentCode}`
          );
        } catch {
          Alert.alert('Error', 'Could not open Twitter');
        }
      },
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: 'content-copy',
      color: '#888',
      share: () => shareLink(agentCode),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share via</Text>
      <View style={styles.platforms}>
        {socialPlatforms.map((platform) => (
          <TouchableOpacity
            key={platform.id}
            style={[styles.platform, { backgroundColor: platform.color + '20' }]}
            onPress={() => {
              platform.share();
              if (onShare) onShare(platform.id);
            }}
          >
            <View style={[styles.iconCircle, { backgroundColor: platform.color }]}>
              <Icon name={platform.icon} size={20} color="#fff" />
            </View>
            <Text style={styles.platformName}>{platform.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  platforms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  platform: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    minWidth: 60,
    marginVertical: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformName: {
    color: '#aaa',
    fontSize: 10,
    marginTop: 4,
  },
});

export default SocialShare;