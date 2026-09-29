import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

interface RatingProps {
  score: number;
  reviewsCount?: number;
  size?: 'sm' | 'md';
}

export const Rating: React.FC<RatingProps> = ({
  score,
  reviewsCount,
  size = 'md',
}) => {
  const isSm = size === 'sm';
  return (
    <View style={styles.container}>
      <Text style={[styles.star, isSm && styles.starSm]}>★</Text>
      <Text style={[styles.score, isSm && styles.scoreSm]}>
        {score ? score.toFixed(1) : '5.0'}
      </Text>
      {reviewsCount !== undefined && (
        <Text style={[styles.reviews, isSm && styles.reviewsSm]}>
          ({reviewsCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#F59E0B',
    fontSize: 14,
    marginRight: 3,
  },
  starSm: {
    fontSize: 12,
    marginRight: 2,
  },
  score: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '700',
    color: theme.colors.text,
  },
  scoreSm: {
    fontSize: theme.typography.small.fontSize,
  },
  reviews: {
    fontSize: theme.typography.small.fontSize,
    color: theme.colors.mutedText,
    marginLeft: 3,
  },
  reviewsSm: {
    fontSize: 11,
  },
});

export default Rating;
