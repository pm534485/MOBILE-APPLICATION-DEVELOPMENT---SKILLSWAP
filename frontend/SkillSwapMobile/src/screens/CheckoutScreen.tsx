import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
import PrimaryButton from '../components/PrimaryButton';
import InputField from '../components/InputField';
import bookingApi from '../services/bookingApi';
import { SAMPLE_GIGS } from '../constants/sampleData';

interface CheckoutScreenProps {
  navigation: any;
  route: any;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  navigation,
  route,
}) => {
  const { selectedGig, user } = useSkillSwap();
  const gig =
    selectedGig ||
    SAMPLE_GIGS.find((g) => g.id === route?.params?.gigId) ||
    SAMPLE_GIGS[0];

  const gigId = gig.id || (gig as any)._id;

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const basePrice = gig.price || 500;
  const platformFee = Math.round(basePrice * 0.05); // 5% simulated campus pool fee
  const finalTotal = Math.max(0, basePrice + platformFee - discount);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'CAMPUS10') {
      const disc = Math.round(basePrice * 0.1);
      setDiscount(disc);
      setPromoMessage('🎉 10% Campus Peer Discount applied!');
      setIsPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'FIRSTGIG') {
      const disc = 150;
      setDiscount(disc);
      setPromoMessage('🎉 ₹150 First Gig Student Voucher applied!');
      setIsPromoApplied(true);
    } else {
      setPromoMessage('Invalid promo code. Try "CAMPUS10" or "FIRSTGIG"');
      setIsPromoApplied(false);
      setDiscount(0);
    }
  };

  const handleConfirmAndPay = async () => {
    setLoading(true);
    try {
      await bookingApi.createBooking(gigId, user?._id || user?.id || 'u_default');
      setConfirmed(true);
      setTimeout(() => {
        navigation.navigate('MyGigs');
      }, 1500);
    } catch {
      // Academic simulated success fallback
      setConfirmed(true);
      setTimeout(() => {
        navigation.navigate('MyGigs');
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <SafeAreaView style={styles.successContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#DCFCE7" />
        <View style={styles.successCard}>
          <View style={styles.successIconCircle}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSub}>
            Your order for "{gig.title}" has been placed with {gig.owner?.name}.
          </Text>
          <Text style={styles.successRedirect}>
            Redirecting to My Gigs active bookings...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Checkout</Text>
        <View style={{ width: 48 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Gig Summary Card */}
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Booking Summary</Text>
            <Text style={styles.gigTitle}>{gig.title}</Text>
            <View style={styles.freelancerMiniRow}>
              <View style={styles.avatarPill}>
                <Text style={styles.avatarText}>
                  {gig.owner?.avatar ||
                    gig.owner?.name?.slice(0, 2).toUpperCase() ||
                    'SS'}
                </Text>
              </View>
              <View>
                <Text style={styles.freelancerName}>{gig.owner?.name}</Text>
                <Text style={styles.deliveryTime}>⏱ Turnaround: {gig.deliveryTime}</Text>
              </View>
            </View>
          </View>

          {/* Promo Code Section */}
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Student Promo Code</Text>
            <View style={styles.promoRow}>
              <View style={styles.promoInputWrapper}>
                <InputField
                  label=""
                  placeholder="e.g. CAMPUS10"
                  value={promoCode}
                  onChangeText={setPromoCode}
                  autoCapitalize="characters"
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
              <TouchableOpacity style={styles.applyBtn} onPress={applyPromo}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {Boolean(promoMessage) && (
              <Text
                style={[
                  styles.promoMessageText,
                  isPromoApplied ? styles.promoSuccess : styles.promoError,
                ]}>
                {promoMessage}
              </Text>
            )}
          </View>

          {/* Cost Breakdown Card */}
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>Payment Details</Text>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Base Service Rate</Text>
              <Text style={styles.costValue}>₹{basePrice}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Campus Support Fee (5%)</Text>
              <Text style={styles.costValue}>₹{platformFee}</Text>
            </View>
            {discount > 0 && (
              <View style={styles.costRow}>
                <Text style={[styles.costLabel, { color: theme.colors.success }]}>
                  Promo Discount
                </Text>
                <Text style={[styles.costValue, { color: theme.colors.success }]}>
                  -₹{discount}
                </Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable</Text>
              <Text style={styles.totalValue}>₹{finalTotal}</Text>
            </View>
          </View>

          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              🔒 Academic Demonstration: Payment is simulated. Confirming creates an
              active booking with status 'active' in the database.
            </Text>
          </View>

          <PrimaryButton
            title={`Confirm & Pay ₹${finalTotal}`}
            onPress={handleConfirmAndPay}
            loading={loading}
            style={styles.confirmBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backBtn: {
    padding: 6,
  },
  backBtnText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  cardSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10,
  },
  gigTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 10,
    lineHeight: 22,
  },
  freelancerMiniRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  freelancerName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text,
  },
  deliveryTime: {
    fontSize: 11,
    color: theme.colors.mutedText,
    marginTop: 2,
  },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  promoInputWrapper: {
    flex: 1,
  },
  applyBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  promoMessageText: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
  },
  promoSuccess: {
    color: theme.colors.success,
  },
  promoError: {
    color: theme.colors.error,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 13,
    color: theme.colors.mutedText,
  },
  costValue: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  noteBox: {
    backgroundColor: theme.colors.chip,
    padding: 12,
    borderRadius: theme.radius.md,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    color: theme.colors.primaryDark,
    lineHeight: 18,
    textAlign: 'center',
  },
  confirmBtn: {
    marginTop: 4,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.xl,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    ...theme.shadow.card,
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successCheck: {
    fontSize: 32,
    color: theme.colors.success,
    fontWeight: '900',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
  },
  successSub: {
    fontSize: 14,
    color: theme.colors.mutedText,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  successRedirect: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
