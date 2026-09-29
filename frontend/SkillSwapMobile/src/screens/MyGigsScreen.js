import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const gigs = [
  {id: '1', title: 'Brand identity for a café', category: 'Design', price: '₹1,800', status: 'In progress', due: 'Due tomorrow', icon: '✦', color: '#E8DDFF', iconColor: '#6B45C6'},
  {id: '2', title: 'Event highlight reel', category: 'Video', price: '₹2,400', status: 'Review', due: 'Updated 2h ago', icon: '▶', color: '#D9F7EA', iconColor: '#16845B'},
  {id: '3', title: 'Product descriptions', category: 'Writing', price: '₹950', status: 'Completed', due: 'Paid on 12 Aug', icon: 'Aa', color: '#FFE7D2', iconColor: '#BD5D19'},
];

function MyGigsScreen() {
  const [activeFilter, setActiveFilter] = useState('Active');
  const [selectedGig, setSelectedGig] = useState('1');
  const visibleGigs = gigs.filter(gig => activeFilter === 'Active' ? gig.status !== 'Completed' : gig.status === 'Completed');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F7FB" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR WORKSPACE</Text>
            <Text style={styles.title}>My Gigs</Text>
          </View>
          <TouchableOpacity style={styles.avatar} activeOpacity={0.8}>
            <Text style={styles.avatarText}>AM</Text>
            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <View>
              <Text style={styles.balanceLabel}>EARNINGS THIS MONTH</Text>
              <Text style={styles.balance}>₹5,150</Text>
            </View>
            <View style={styles.chartBadge}>
              <Text style={styles.chartIcon}>↗</Text><Text style={styles.chartText}>18%</Text>
            </View>
          </View>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceFooter}>
            <Text style={styles.balanceFooterText}>2 projects currently active</Text>
            <Text style={styles.balanceArrow}>›</Text>
          </View>
          <View style={styles.decorativeCircleLarge} />
          <View style={styles.decorativeCircleSmall} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your projects</Text>
          <TouchableOpacity activeOpacity={0.7}><Text style={styles.viewAll}>View all</Text></TouchableOpacity>
        </View>

        <View style={styles.filters}>
          {['Active', 'Completed'].map(filter => {
            const active = activeFilter === filter;
            return <TouchableOpacity key={filter} style={[styles.filter, active && styles.filterActive]} onPress={() => setActiveFilter(filter)} activeOpacity={0.8}>
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>;
          })}
        </View>

        <View style={styles.gigList}>
          {visibleGigs.map(gig => {
            const selected = selectedGig === gig.id;
            return <TouchableOpacity key={gig.id} onPress={() => setSelectedGig(gig.id)} style={[styles.gigCard, selected && styles.gigCardSelected]} activeOpacity={0.85}>
              <View style={[styles.gigIcon, {backgroundColor: gig.color}]}><Text style={[styles.gigIconText, {color: gig.iconColor}]}>{gig.icon}</Text></View>
              <View style={styles.gigInfo}>
                <View style={styles.gigTitleRow}><Text style={styles.gigTitle} numberOfLines={1}>{gig.title}</Text><Text style={styles.price}>{gig.price}</Text></View>
                <Text style={styles.gigMeta}>{gig.category}  ·  {gig.due}</Text>
                <View style={styles.statusRow}><View style={[styles.statusDot, gig.status === 'Completed' && styles.statusDotComplete]} /><Text style={[styles.status, gig.status === 'Completed' && styles.statusComplete]}>{gig.status}</Text></View>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>;
          })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}><Text style={styles.fabPlus}>+</Text><Text style={styles.fabText}>New gig</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#F7F7FB'}, content: {paddingHorizontal: 20, paddingTop: 20, paddingBottom: 108}, header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25},
  eyebrow: {color: '#807C91', fontSize: 11, fontWeight: '800', letterSpacing: 1.4}, title: {color: '#1D1A2C', fontSize: 32, fontWeight: '800', letterSpacing: -1, marginTop: 3}, avatar: {height: 46, width: 46, borderRadius: 23, backgroundColor: '#28223E', alignItems: 'center', justifyContent: 'center'}, avatarText: {color: '#FFF', fontSize: 14, fontWeight: '800'}, onlineDot: {position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: 6, backgroundColor: '#62D1A3', borderWidth: 2, borderColor: '#F7F7FB'},
  balanceCard: {backgroundColor: '#433089', borderRadius: 24, padding: 22, overflow: 'hidden', shadowColor: '#34266E', shadowOpacity: 0.18, shadowRadius: 16, shadowOffset: {width: 0, height: 8}, elevation: 5}, balanceTopRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}, balanceLabel: {color: '#CFC6FA', fontSize: 10, fontWeight: '800', letterSpacing: 1.1}, balance: {color: '#FFF', fontSize: 31, fontWeight: '800', letterSpacing: -0.7, marginTop: 7}, chartBadge: {flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 7, backgroundColor: 'rgba(255,255,255,0.14)'}, chartIcon: {color: '#9DEAC8', fontSize: 16, fontWeight: '800', marginRight: 4}, chartText: {color: '#D2F6E4', fontSize: 12, fontWeight: '800'}, balanceDivider: {height: 1, backgroundColor: 'rgba(255,255,255,0.16)', marginTop: 22, marginBottom: 13}, balanceFooter: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}, balanceFooterText: {color: '#E9E5FF', fontSize: 13, fontWeight: '600'}, balanceArrow: {color: '#FFF', fontSize: 24, lineHeight: 22}, decorativeCircleLarge: {position: 'absolute', width: 170, height: 170, borderRadius: 85, borderWidth: 28, borderColor: 'rgba(255,255,255,0.05)', right: -67, bottom: -77}, decorativeCircleSmall: {position: 'absolute', width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(162,134,255,0.2)', right: 50, top: -33},
  sectionHeader: {marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}, sectionTitle: {color: '#242132', fontSize: 20, fontWeight: '800', letterSpacing: -0.3}, viewAll: {color: '#6A54BC', fontSize: 13, fontWeight: '800'}, filters: {flexDirection: 'row', marginTop: 16, marginBottom: 16}, filter: {paddingHorizontal: 16, paddingVertical: 9, marginRight: 9, borderRadius: 12, backgroundColor: '#EEEAF7'}, filterActive: {backgroundColor: '#2B2541'}, filterText: {color: '#6A6579', fontSize: 13, fontWeight: '700'}, filterTextActive: {color: '#FFF'}, gigList: {gap: 12},
  gigCard: {backgroundColor: '#FFF', padding: 14, borderRadius: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEEAF4', shadowColor: '#31285A', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: {width: 0, height: 3}, elevation: 1}, gigCardSelected: {borderColor: '#9D8BD9', backgroundColor: '#FEFDFF'}, gigIcon: {height: 46, width: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12}, gigIconText: {fontSize: 18, fontWeight: '800'}, gigInfo: {flex: 1}, gigTitleRow: {flexDirection: 'row', alignItems: 'center'}, gigTitle: {color: '#292538', fontSize: 14, fontWeight: '800', flex: 1, marginRight: 5}, price: {color: '#403368', fontSize: 13, fontWeight: '800'}, gigMeta: {color: '#807A8C', fontSize: 12, marginTop: 4}, statusRow: {flexDirection: 'row', alignItems: 'center', marginTop: 8}, statusDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#EDAC3F', marginRight: 5}, statusDotComplete: {backgroundColor: '#50B78C'}, status: {color: '#A26B16', fontSize: 11, fontWeight: '800'}, statusComplete: {color: '#25845C'}, chevron: {fontSize: 25, color: '#A4A0B0', marginLeft: 8},
  fab: {position: 'absolute', right: 20, bottom: 22, borderRadius: 17, backgroundColor: '#F16544', paddingHorizontal: 18, height: 54, flexDirection: 'row', alignItems: 'center', shadowColor: '#BD472D', shadowOpacity: 0.28, shadowRadius: 10, shadowOffset: {width: 0, height: 5}, elevation: 5}, fabPlus: {color: '#FFF', fontSize: 24, lineHeight: 25, marginRight: 7, fontWeight: '400'}, fabText: {color: '#FFF', fontSize: 14, fontWeight: '800'},
});

export default MyGigsScreen;
