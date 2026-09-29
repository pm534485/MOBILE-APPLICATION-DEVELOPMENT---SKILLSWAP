import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import { useSkillSwap } from '../context/SkillSwapContext';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { removeGig, saveGig } from '../redux/gigSlice';
import Rating from '../components/Rating';
import PrimaryButton from '../components/PrimaryButton';
import StatusBadge from '../components/StatusBadge';
import { SAMPLE_GIGS } from '../constants/sampleData';

interface GigDetailsScreenProps {
  navigation: any;
  route: any;
}

export const GigDetailsScreen: React.FC<GigDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { selectedGig } = useSkillSwap();
  const dispatch = useAppDispatch();
  const savedGigs = useAppSelector((state) => state.gigs.saved);

  // Use selectedGig or fallback to sample gig
  const gig =
    selectedGig ||
    SAMPLE_GIGS.find((g) => g.id === route?.params?.gigId) ||
    SAMPLE_GIGS[0];

  const gigId = gig.id || (gig as any)._id;
  const isSaved = savedGigs.some((g) => g.id === gigId);

  const toggleSave = () => {
    if (isSaved) {
      dispatch(removeGig(gigId));
    } else {
      dispatch(
        saveGig({
          id: gigId,
          title: gig.title,
          price: gig.price,
          category: gig.category,
          deliveryTime: gig.deliveryTime,
        })
      );
    }
  };

  const handleBookGig = () => {
    navigation.navigate('Checkout', { gigId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />

      {/* Top Banner Header */}
      <View style={styles.bannerHeader}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.bannerTitle} numberOfLines={1}>
          Gig Details
        </Text>
        <TouchableOpacity style={styles.heartBtn} onPress={toggleSave}>
          <Text style={styles.heartIcon}>{isSaved ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Banner Graphic Card */}
        <View style={styles.heroCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{gig.category}</Text>
          </View>
          <Text style={styles.gigTitle}>{gig.title}</Text>
          <View style={styles.badgeRow}>
            <StatusBadge status={gig.status} />
            <View style={styles.deliveryBadge}>
              <Text style={styles.deliveryBadgeText}>⏱ {gig.deliveryTime}</Text>
            </View>
          </View>
        </View>

        {/* Freelancer Profile Card */}
        <View style={styles.freelancerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {gig.owner?.avatar ||
                gig.owner?.name?.slice(0, 2).toUpperCase() ||
                'Peer'}
            </Text>
          </View>
          <View style={styles.freelancerInfo}>
            <Text style={styles.freelancerName}>
              {gig.owner?.name || 'Campus Freelancer'}
            </Text>
            <Text style={styles.freelancerDept}>
              {gig.owner?.department || 'Student Freelancer'}
            </Text>
            <View style={styles.ratingRow}>
              <Rating
                score={gig.rating || 5.0}
                reviewsCount={gig.reviewsCount || 12}
              />
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About This Service</Text>
          <Text style={styles.descriptionText}>{gig.description}</Text>
        </View>

        {/* What's Included (Feature Checklist) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {(gig.features && gig.features.length > 0
            ? gig.features
            : [
                'Direct peer communication & collaboration',
                'Fast turnaround by campus freelancer',
                '1 revision included',
                'Academic / club-friendly output',
              ]
          ).map((feature, idx) => (
            <View key={idx} style={styles.featureItem}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Campus Guarantee Notice */}
        <View style={styles.guaranteeBox}>
          <Text style={styles.guaranteeIcon}>🛡️</Text>
          <View style={styles.guaranteeTextContainer}>
            <Text style={styles.guaranteeTitle}>Campus Peer Protection</Text>
            <Text style={styles.guaranteeSub}>
              Direct student-to-student escrow simulation. Satisfaction guaranteed
              before delivery completion.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Booking Bar */}
      <View style={styles.stickyFooter}>
        <View style={styles.footerPriceContainer}>
          <Text style={styles.footerPriceLabel}>Total Investment</Text>
          <Text style={styles.footerPriceValue}>₹{gig.price}</Text>
        </View>

        <View style={styles.footerActions}>
          <TouchableOpacity
            style={[styles.saveActionBtn, isSaved && styles.savedActiveBtn]}
            onPress={toggleSave}>
            <Text style={styles.saveActionIcon}>{isSaved ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <PrimaryButton
            title="Book Gig"
            onPress={handleBookGig}
            style={styles.bookBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  bannerHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: theme.colors.primary,
  },
  backBtn: {
    padding: 8,
  },
  backBtnText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 12,
  },
  heartBtn: {
    padding: 8,
  },
  heartIcon: {
    fontSize: 20,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  categoryBadge: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.radius.sm,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    color: theme.colors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  gigTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text,
    lineHeight: 28,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
  },
  deliveryBadgeText: {
    fontSize: 12,
    color: theme.colors.mutedText,
    fontWeight: '600',
  },
  freelancerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.chip,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  freelancerInfo: {
    flex: 1,
  },
  freelancerName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  freelancerDept: {
    fontSize: 12,
    color: theme.colors.mutedText,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureCheck: {
    color: theme.colors.success,
    fontWeight: '800',
    fontSize: 15,
    marginRight: 10,
  },
  featureText: {
    fontSize: 13,
    color: theme.colors.text,
  },
  guaranteeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: theme.radius.md,
    padding: 14,
  },
  guaranteeIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  guaranteeTextContainer: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.success,
  },
  guaranteeSub: {
    fontSize: 11,
    color: '#166534',
    marginTop: 2,
    lineHeight: 16,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadow.modal,
  },
  footerPriceContainer: {
    justifyContent: 'center',
  },
  footerPriceLabel: {
    fontSize: 11,
    color: theme.colors.mutedText,
  },
  footerPriceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  saveActionBtn: {
    width: 46,
    height: 46,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  savedActiveBtn: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  saveActionIcon: {
    fontSize: 20,
  },
  bookBtn: {
    paddingHorizontal: 26,
  },
});

export default GigDetailsScreen;
