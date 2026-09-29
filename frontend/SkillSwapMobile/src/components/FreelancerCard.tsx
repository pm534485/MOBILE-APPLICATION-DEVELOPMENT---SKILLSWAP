import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import { Freelancer } from '../constants/sampleData';
import Rating from './Rating';

interface FreelancerCardProps {
  freelancer: Freelancer;
  onPress?: () => void;
}

export const FreelancerCard: React.FC<FreelancerCardProps> = ({
  freelancer,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={styles.card}
      onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{freelancer.avatar}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {freelancer.name}
      </Text>
      <Text style={styles.department} numberOfLines={1}>
        {freelancer.department}
      </Text>
      <View style={styles.ratingRow}>
        <Rating score={freelancer.rating} reviewsCount={freelancer.reviewCount} size="sm" />
      </View>
      <View style={styles.skillsRow}>
        {freelancer.skills.slice(0, 2).map((skill, idx) => (
          <View key={idx} style={styles.skillBadge}>
            <Text style={styles.skillText}>{skill}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.lg,
    padding: 14,
    width: 155,
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    ...theme.shadow.card,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  department: {
    fontSize: 11,
    color: theme.colors.mutedText,
    textAlign: 'center',
    marginBottom: 6,
  },
  ratingRow: {
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  skillBadge: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: theme.radius.sm,
  },
  skillText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
});

export default FreelancerCard;
