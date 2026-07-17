import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'victory-native';

const { width } = Dimensions.get('window');

const EarningsChart = ({ data, type = 'line', title, loading = false }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={[styles.placeholder, { height: 200 }]} />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No earnings data available</Text>
      </View>
    );
  }

  const ChartComponent = type === 'line' ? LineChart : BarChart;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ChartComponent
        data={data}
        x="label"
        y="value"
        height={200}
        width={width - 60}
        padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
        style={{
          data: {
            stroke: '#9C27B0',
            strokeWidth: 3,
            fill: 'rgba(156, 39, 176, 0.2)',
          },
          labels: {
            fontSize: 10,
            fill: '#888',
          },
        }}
        animate={{
          duration: 500,
          onLoad: { duration: 500 },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 14,
  },
  loadingContainer: {
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  placeholder: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
});

export default EarningsChart;