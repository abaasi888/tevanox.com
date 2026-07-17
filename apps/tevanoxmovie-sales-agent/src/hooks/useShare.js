import { useState } from 'react';
import { Share, Linking, Alert } from 'react-native';

const REFERRAL_LINK = process.env.REFERRAL_LINK || 'https://tevanox.com/register?ref=';

export const useShare = () => {
  const [qrCodeRef, setQrCodeRef] = useState(null);

  const shareViaWhatsApp = async (agentCode, message) => {
    const text = message || `📱 Download TevanoxMovie and get premium entertainment! Use my agent code: ${agentCode}\n\n🎬 Movies & Music - Unlimited Streaming\n💰 Subscribe and enjoy!`;
    const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'WhatsApp is not installed on your device');
    }
  };

  const shareViaTelegram = async (agentCode, message) => {
    const text = message || `📱 Download TevanoxMovie and get premium entertainment! Use my agent code: ${agentCode}\n\n🎬 Movies & Music - Unlimited Streaming\n💰 Subscribe and enjoy!`;
    const url = `tg://msg?text=${encodeURIComponent(text)}`;
    
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Telegram is not installed on your device');
    }
  };

  const shareGeneral = async (agentCode, message) => {
    const text = message || `📱 Download TevanoxMovie and get premium entertainment! Use my agent code: ${agentCode}\n\n🎬 Movies & Music - Unlimited Streaming\n💰 Subscribe and enjoy!\n\nDownload: ${REFERRAL_LINK}${agentCode}`;
    
    try {
      await Share.share({
        message: text,
        title: 'Invite Friends to TevanoxMovie',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const shareLink = async (agentCode) => {
    const link = `${REFERRAL_LINK}${agentCode}`;
    try {
      await Share.share({
        message: `Join TevanoxMovie using my referral link: ${link}`,
        title: 'Share Referral Link',
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const generateQRCode = (agentCode) => {
    return `${REFERRAL_LINK}${agentCode}`;
  };

  return {
    shareViaWhatsApp,
    shareViaTelegram,
    shareGeneral,
    shareLink,
    generateQRCode,
    qrCodeRef,
    setQrCodeRef,
  };
};