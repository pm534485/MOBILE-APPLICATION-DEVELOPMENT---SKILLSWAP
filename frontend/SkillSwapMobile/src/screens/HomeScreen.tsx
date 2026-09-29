import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
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
import { CATEGORIES, FREELANCERS, Gig } from '../constants/sampleData';
import { useSkillSwap } from '../context/SkillSwapContext';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { removeGig, saveGig } from '../redux/gigSlice';
import gigApi from '../services/gigApi';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import FreelancerCard from '../components/FreelancerCard';
import GigCard from '../components/GigCard';
import SectionHeader from '../components/SectionHeader';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user, setSelectedGig } = useSkillSwap();
  const dispatch = useAppDispatch();
  const savedGigs = useAppSelector((state) => state.gigs.saved);
  const totalSavedCost = useAppSelector((state) => state.gigs.totalCost);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);

  const fetchGigs = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const result = await gigApi.getGigs(selectedCategory);
      setGigs(result.data);
      setIsOfflineFallback(!result.fromServer);
    } catch (err: any) {
      setError(err.message || 'Unable to connect to SkillSwap backend.');
      setIsOfflineFallback(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchGigs();
  }, [fetchGigs]);

  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gig.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'All' ||
        gig.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [gigs, searchQuery, selectedCategory]);

  const handleGigPress = (gig: Gig) => {
    setSelectedGig(gig);
    navigation.navigate('GigDetails', { gigId: gig.id || (gig as any)._id });
  };

  const handleToggleSave = (gig: Gig) => {
    const gigId = gig.id || (gig as any)._id;
    const isSaved = savedGigs.some((g) => g.id === gigId);
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

  const allCategories = [{ id: 'all', name: 'All', icon: '⚡' }, ...CATEGORIES];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.card} />

      {/* Header Bar */}
      <View style={styles.topHeader}>
        <View style={styles.userGreetingRow}>
          <TouchableOpacity
            style={styles.menuIconBtn}
            onPress={() => navigation.openDrawer && navigation.openDrawer()}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <View style={styles.greetingTextContainer}>
            <Text style={styles.greetingEyebrow}>CAMPUS FREELANCE HUB</Text>
            <Text style={styles.greetingTitle}>
              Hello, {user?.name?.split(' ')[0] || 'Student'} 👋
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.avatarPill}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatarPillText}>
            {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'SS')}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollBody}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchGigs(true)}
            colors={[theme.colors.primary]}
          />
        }>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />

        {/* Offline Fallback indicator banner (per Section 5 demo rule) */}
        {isOfflineFallback && (
          <View style={styles.offlineNotice}>
            <Text style={styles.offlineNoticeText}>
              ℹ️ Offline Mode: Displaying campus sample gigs (backend unreachable)
            </Text>
          </View>
        )}

        {/* Redux Saved Gigs live badge if user has saved gigs */}
        {savedGigs.length > 0 && (
          <View style={styles.savedGigsBanner}>
            <View style={styles.savedGigsLeft}>
              <Text style={styles.savedGigsIcon}>❤️</Text>
              <Text style={styles.savedGigsText}>
                {savedGigs.length} Saved {savedGigs.length === 1 ? 'Gig' : 'Gigs'}
              </Text>
            </View>
            <Text style={styles.savedGigsTotal}>
              Est. Total: ₹{totalSavedCost}
            </Text>
          </View>
        )}

        {/* Categories Section */}
        <SectionHeader title="Categories" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}>
          {allCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              icon={cat.icon}
              isSelected={selectedCategory === cat.name}
              onPress={() => setSelectedCategory(cat.name)}
            />
          ))}
        </ScrollView>

        {/* Recommended Campus Freelancers */}
        <SectionHeader
          title="Campus Talent"
          actionText="See all"
          onActionPress={() => {}}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.freelancersContainer}>
          {FREELANCERS.map((freelancer) => (
            <FreelancerCard
              key={freelancer.id}
              freelancer={freelancer}
              onPress={() => {}}
            />
          ))}
        </ScrollView>

        {/* Available Gigs Section */}
        <SectionHeader
          title={
            selectedCategory === 'All'
              ? 'Available Peer Gigs'
              : `${selectedCategory} Gigs`
          }
          actionText="Refresh"
          onActionPress={() => fetchGigs(true)}
        />

        {loading && !refreshing ? (
          <LoadingState message="Loading latest campus gigs..." />
        ) : error && gigs.length === 0 ? (
          <ErrorState message={error} onRetry={() => fetchGigs()} />
        ) : filteredGigs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No matching gigs found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with a different keyword or category.
            </Text>
          </View>
        ) : (
          filteredGigs.map((gig) => {
            const gigId = gig.id || (gig as any)._id;
            const isSaved = savedGigs.some((g) => g.id === gigId);
            return (
              <GigCard
                key={gigId}
                gig={gig}
                isSaved={isSaved}
                onPress={() => handleGigPress(gig)}
                onSaveToggle={() => handleToggleSave(gig)}
              />
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  userGreetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconBtn: {
    padding: 8,
    marginRight: 8,
  },
  menuIcon: {
    fontSize: 22,
    color: theme.colors.text,
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  greetingTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
    marginTop: 2,
  },
  avatarPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.chip,
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPillText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  scrollBody: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  searchBar: {
    marginBottom: 12,
  },
  offlineNotice: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: theme.radius.sm,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  offlineNoticeText: {
    fontSize: 12,
    color: theme.colors.warning,
    fontWeight: '600',
    textAlign: 'center',
  },
  savedGigsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  savedGigsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedGigsIcon: {
    fontSize: 15,
    marginRight: 6,
  },
  savedGigsText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  savedGigsTotal: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  categoriesContainer: {
    paddingVertical: 6,
    paddingRight: 10,
    marginBottom: 10,
  },
  freelancersContainer: {
    paddingVertical: 6,
    paddingRight: 10,
    marginBottom: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: theme.colors.mutedText,
    textAlign: 'center',
  },
});

export default HomeScreen;
