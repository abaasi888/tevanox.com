export const formatCurrency = (amount, currency = 'UGX') => {
  if (!amount) return `${currency} 0`;
  return `${currency} ${amount.toLocaleString()}`;
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatNumber = (number) => {
  if (!number) return '0';
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }
  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number.toString();
};

export const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
};

export const getTierInfo = (tier) => {
  const tiers = {
    1: { name: 'Tier 1', color: '#4CAF50', rate: '15%' },
    2: { name: 'Tier 2', color: '#2196F3', rate: '12%' },
    3: { name: 'Tier 3', color: '#FF9800', rate: '10%' },
    4: { name: 'Tier 4', color: '#9C27B0', rate: '8%' },
  };
  return tiers[tier] || tiers[1];
};

export const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
};