import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
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
import bookingApi, { Booking } from '../services/bookingApi';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import LoadingState from '../components/LoadingState';

interface MyGigsScreenProps {
  navigation: any;
}

const SAMPLE_INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    gig: {
      id: 'g1',
      title: 'Custom Club Website & Portfolio Development',
      price: 1500,
      deliveryTime: '2 Days',
      owner: { name: 'Aarav Sharma' },
    },
    user: { name: 'Aarav Sharma' },
    status: 'active',
    createdAt: '2026-09-15T10:00:00.000Z',
  },
  {
    id: 'b2',
    gig: {
      id: 'g2',
      title: 'Campus Fest Poster & Club Logo Design',
      price: 800,
      deliveryTime: '24 Hours',
      owner: { name: 'Priya Patel' },
    },
    user: { name: 'Aarav Sharma' },
    status: 'pending',
    createdAt: '2026-09-17T14:30:00.000Z',
  },
  {
    id: 'b3',
    gig: {
      id: 'g4',
      title: '1-on-1 Data Structures & Algorithms Tutoring',
      price: 500,
      deliveryTime: '1 Hour',
      owner: { name: 'Ananya Roy' },
    },
    user: { name: 'Aarav Sharma' },
    status: 'completed',
    createdAt: '2026-09-10T09:00:00.000Z',
  },
];

export const MyGigsScreen: React.FC<MyGigsScreenProps> = ({ navigation }) => {
  const { user } = useSkillSwap();
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_INITIAL_BOOKINGS);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const userId = user?._id || user?.id || 'u_default';
      const serverBookings = await bookingApi.getUserBookings(userId);
      if (serverBookings && serverBookings.length > 0) {
        setBookings(serverBookings);
      } else {
        setBookings(SAMPLE_INITIAL_BOOKINGS);
      }
    } catch {
      setBookings(SAMPLE_INITIAL_BOOKINGS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filteredBookings = bookings.filter(
    (b) => b.status.toLowerCase() === activeTab
  );

  const totalSpent = bookings.reduce(
    (sum, b) => sum + (b.gig?.price || 0),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Campus Gigs</Text>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => fetchBookings(true)}>
          <Text style={styles.refreshIcon}>↻</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchBookings(true)}
            colors={[theme.colors.primary]}
          />
        }>
        {/* Total Spending Summary Card */}
        <View style={styles.spendingCard}>
          <View>
            <Text style={styles.spendingEyebrow}>ALL ORDERS COMBINED</Text>
            <Text style={styles.spendingTitle}>Total Campus Spending</Text>
            <Text style={styles.spendingSubtitle}>
              Supporting {bookings.length} student peer freelance contracts
            </Text>
          </View>
          <View style={styles.spendingAmountContainer}>
            <Text style={styles.spendingAmount}>₹{totalSpent}</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {(['active', 'pending', 'completed'] as const).map((tab) => {
            const count = bookings.filter((b) => b.status === tab).length;
            const isSelected = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isSelected && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    styles.tabButtonText,
                    isSelected && styles.tabButtonTextActive,
                  ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
                <View
                  style={[
                    styles.tabBadge,
                    isSelected ? styles.tabBadgeActive : styles.tabBadgeInactive,
                  ]}>
                  <Text
                    style={[
                      styles.tabBadgeText,
                      isSelected ? styles.tabBadgeTextActive : styles.tabBadgeTextInactive,
                    ]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Booking Items or Empty State */}
        {loading && !refreshing ? (
          <LoadingState message="Fetching your campus orders..." />
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            icon={activeTab === 'completed' ? '🏆' : activeTab === 'pending' ? '⏳' : '🚀'}
            title={`No ${activeTab} gigs`}
            description={
              activeTab === 'active'
                ? "You don't have any in-progress orders right now. Discover services from student peers!"
                : activeTab === 'pending'
                ? 'No pending gig requests waiting for freelancer approval.'
                : 'Completed gigs will show here once deliverables are accepted.'
            }
            actionText="Browse Campus Marketplace"
            onActionPress={() => navigation.navigate('Home')}
          />
        ) : (
          filteredBookings.map((booking) => {
            const bId = booking.id || booking._id;
            return (
              <View key={bId} style={styles.bookingCard}>
                <View style={styles.bookingTopRow}>
                  <Text style={styles.bookingCategory}>
                    {booking.gig?.category || 'Student Service'}
                  </Text>
                  <StatusBadge status={booking.status} />
                </View>

                <Text style={styles.bookingTitle}>{booking.gig?.title}</Text>

                <View style={styles.bookingMetaRow}>
                  <Text style={styles.bookingFreelancer}>
                    Freelancer: <Text style={{ fontWeight: '700' }}>{booking.gig?.owner?.name || 'Campus Peer'}</Text>
                  </Text>
                  <Text style={styles.bookingPrice}>₹{booking.gig?.price || 0}</Text>
                </View>

                <View style={styles.bookingFooterRow}>
                  <Text style={styles.bookingDelivery}>
                    ⏱ Delivery: {booking.gig?.deliveryTime || 'Standard'}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsBtn}
                    onPress={() => {
                      if (booking.gig) {
                        navigation.navigate('Home', {
                          screen: 'GigDetails',
                          params: { gigId: booking.gig.id || booking.gig._id },
                        });
                      }
                    }}>
                    <Text style={styles.detailsBtnText}>View Details →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
  },
  refreshBtn: {
    padding: 6,
  },
  refreshIcon: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  spendingCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    ...theme.shadow.card,
  },
  spendingEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.chip,
    letterSpacing: 1,
  },
  spendingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  spendingSubtitle: {
    fontSize: 11,
    color: '#D8E2FD',
    marginTop: 4,
  },
  spendingAmountContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
  },
  spendingAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E4E7EE',
    borderRadius: theme.radius.pill,
    padding: 4,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: theme.radius.pill,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    ...theme.shadow.card,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.mutedText,
    marginRight: 6,
  },
  tabButtonTextActive: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  tabBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: theme.radius.pill,
  },
  tabBadgeActive: {
    backgroundColor: theme.colors.chip,
  },
  tabBadgeInactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tabBadgeTextActive: {
    color: theme.colors.primaryDark,
  },
  tabBadgeTextInactive: {
    color: theme.colors.mutedText,
  },
  bookingCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  bookingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  bookingCategory: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.mutedText,
    textTransform: 'uppercase',
  },
  bookingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  bookingMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingFreelancer: {
    fontSize: 13,
    color: theme.colors.text,
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  bookingFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 8,
    marginTop: 4,
  },
  bookingDelivery: {
    fontSize: 12,
    color: theme.colors.mutedText,
  },
  detailsBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  detailsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});

export default MyGigsScreen;
