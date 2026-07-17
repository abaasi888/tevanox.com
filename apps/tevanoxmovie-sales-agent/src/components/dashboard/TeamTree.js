import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Collapsible from 'react-native-collapsible';

const TeamTree = ({ data, level = 0, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const toggleExpand = () => {
    if (data.children && data.children.length > 0) {
      setExpanded(!expanded);
    }
  };

  const getLevelColor = () => {
    const colors = ['#9C27B0', '#2196F3', '#4CAF50', '#FF9800', '#FF4757'];
    return colors[level % colors.length];
  };

  return (
    <View style={[styles.node, { paddingLeft: level * 20 }]}>
      <TouchableOpacity
        style={[styles.nodeContent, { borderLeftColor: getLevelColor() }]}
        onPress={() => onSelect && onSelect(data)}
        onLongPress={toggleExpand}
        activeOpacity={0.7}
      >
        <View style={styles.nodeHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {data.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <View style={styles.nodeInfo}>
            <Text style={styles.nodeName}>{data.name}</Text>
            <Text style={styles.nodeDetails}>
              {data.type === 'agent' ? '👔 Agent' : '👤 User'} • Tier {data.tier || 1}
            </Text>
            {data.referrals && (
              <Text style={styles.nodeReferrals}>
                {data.referrals} referrals
              </Text>
            )}
          </View>
          {data.children && data.children.length > 0 && (
            <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
              <Icon
                name={expanded ? 'expand-less' : 'expand-more'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {data.children && data.children.length > 0 && (
        <Collapsible collapsed={!expanded}>
          {data.children.map((child, index) => (
            <TeamTree
              key={index}
              data={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </Collapsible>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  node: {
    marginVertical: 2,
  },
  nodeContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9C27B0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nodeInfo: {
    flex: 1,
  },
  nodeName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  nodeDetails: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  nodeReferrals: {
    color: '#9C27B0',
    fontSize: 11,
    marginTop: 2,
  },
  expandButton: {
    padding: 4,
  },
});

export default TeamTree;