import { Share, Linking, Platform } from 'react-native';

export const shareText = async (message, title = 'Share') => {
  try {
    await Share.share({
      message,
      title,
    });
    return true;
  } catch (error) {
    console.error('Share error:', error);
    return false;
  }
};

export const shareViaWhatsApp = async (message) => {
  const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
};

export const shareViaTelegram = async (message) => {
  const url = `tg://msg?text=${encodeURIComponent(message)}`;
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
};

export const shareViaFacebook = async (url, quote) => {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(quote)}`;
  try {
    await Linking.openURL(shareUrl);
    return true;
  } catch {
    return false;
  }
};

export const shareViaTwitter = async (text, url) => {
  const tweet = `${text} ${url}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  try {
    await Linking.openURL(tweetUrl);
    return true;
  } catch {
    return false;
  }
};

export const copyToClipboard = async (text) => {
  if (Platform.OS === 'web') {
    await navigator.clipboard.writeText(text);
  } else {
    // React Native Clipboard
    await Clipboard.setString(text);
  }
  return true;
};