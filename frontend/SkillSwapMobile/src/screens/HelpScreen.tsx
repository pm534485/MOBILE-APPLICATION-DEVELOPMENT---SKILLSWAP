import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../constants/theme';
import AppHeader from '../components/AppHeader';

interface HelpScreenProps {
  navigation: any;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ navigation }) => {
  const faqs = [
    {
      q: 'How does SkillSwap work on campus?',
      a: 'SkillSwap is an academic micro-gig exchange where students offer services (coding, design, proofreading, tutoring) to peers. You can browse, book, or post your own gigs.',
    },
    {
      q: 'How are payments handled?',
      a: 'In this academic demonstration version, payments and balances are simulated. Confirming an order creates a real booking entry in the database without charging a credit card.',
    },
    {
      q: 'Can I post multiple services?',
      a: 'Yes! Navigate to the "Post" tab from the bottom menu to list any campus-friendly skill with your desired delivery time and pricing.',
    },
    {
      q: 'What if a peer doesn’t deliver on time?',
      a: 'Our campus peer guidelines recommend communicating in advance. Bookings remain in "pending" or "active" until both parties acknowledge completion.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader
        title="Help & Campus Support"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Support Banner */}
        <View style={styles.supportCard}>
          <Text style={styles.supportIcon}>🎓</Text>
          <Text style={styles.supportTitle}>Campus Peer Community</Text>
          <Text style={styles.supportText}>
            Built specifically for university students to exchange creative and technical
            services safely and collaboratively.
          </Text>
        </View>

        <Text style={styles.faqHeader}>Frequently Asked Questions</Text>

        {faqs.map((faq, idx) => (
          <View key={idx} style={styles.faqCard}>
            <Text style={styles.questionText}>Q: {faq.q}</Text>
            <Text style={styles.answerText}>{faq.a}</Text>
          </View>
        ))}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need Further Assistance?</Text>
          <Text style={styles.contactSub}>
            Reach out to the student club coordinator or department lab faculty.
          </Text>
          <Text style={styles.contactEmail}>support@campus-skillswap.edu</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  supportCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: 20,
    ...theme.shadow.card,
  },
  supportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  supportText: {
    fontSize: 13,
    color: '#D8E2FD',
    textAlign: 'center',
    lineHeight: 19,
  },
  faqHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 12,
  },
  faqCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 6,
  },
  answerText: {
    fontSize: 13,
    color: theme.colors.mutedText,
    lineHeight: 19,
  },
  contactCard: {
    backgroundColor: theme.colors.chip,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginTop: 10,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primaryDark,
    marginBottom: 4,
  },
  contactSub: {
    fontSize: 12,
    color: theme.colors.mutedText,
    textAlign: 'center',
    marginBottom: 8,
  },
  contactEmail: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
});

export default HelpScreen;
