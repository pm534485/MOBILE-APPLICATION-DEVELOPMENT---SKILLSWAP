import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import { Gig } from '../constants/sampleData';
import Rating from './Rating';
import StatusBadge from './StatusBadge';

interface GigCardProps {
  gig: Gig;
  onPress: () => void;
  onSaveToggle?: () => void;
  isSaved?: boolean;
}

export const GigCard: React.FC<GigCardProps> = ({
  gig,
  onPress,
  onSaveToggle,
  isSaved = false,
}) => {
  const ownerName = gig.owner?.name || 'Campus Peer';
  const ownerDept = gig.owner?.department || 'Student';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={onPress}>
      <View style={styles.topRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{gig.category}</Text>
        </View>
        <View style={styles.topRight}>
          <StatusBadge status={gig.status} />
          {Boolean(onSaveToggle) && (
            <TouchableOpacity
              style={styles.heartBtn}
              onPress={onSaveToggle}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.heartIcon}>{isSaved ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {gig.title}
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        {gig.description}
      </Text>

      <View style={styles.ownerRow}>
        <View style={styles.avatarMini}>
          <Text style={styles.avatarMiniText}>
            {ownerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </Text>
        </View>
        <View style={styles.ownerInfo}>
          <Text style={styles.ownerName} numberOfLines={1}>
            {ownerName}
          </Text>
          <Text style={styles.ownerDept} numberOfLines={1}>
            {ownerDept}
          </Text>
        </View>
        <Rating score={gig.rating || 5.0} reviewsCount={gig.reviewsCount} size="sm" />
      </View>

      <View style={styles.divider} />

      <View style={styles.footerRow}>
        <View style={styles.deliveryBadge}>
          <Text style={styles.deliveryText}>⏱ {gig.deliveryTime}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting at</Text>
          <Text style={styles.priceValue}>₹{gig.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heartBtn: {
    padding: 2,
  },
  heartIcon: {
    fontSize: 16,
  },
  categoryBadge: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    lineHeight: 22,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: theme.colors.mutedText,
    lineHeight: 18,
    marginBottom: 12,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  avatarMiniText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  ownerInfo: {
    flex: 1,
    marginRight: 8,
  },
  ownerName: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.text,
  },
  ownerDept: {
    fontSize: 11,
    color: theme.colors.mutedText,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.radius.sm,
  },
  deliveryText: {
    fontSize: 12,
    color: theme.colors.mutedText,
    fontWeight: '500',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    fontSize: 10,
    color: theme.colors.mutedText,
  },
  priceValue: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.primary,
  },
});

export default GigCard;
