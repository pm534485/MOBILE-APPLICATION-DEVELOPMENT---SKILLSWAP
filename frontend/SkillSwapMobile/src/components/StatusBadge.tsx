import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../constants/theme';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normStatus = (status || 'available').toLowerCase();

  let bg = theme.colors.chip;
  let text = theme.colors.primaryDark;

  if (normStatus === 'available' || normStatus === 'active') {
    bg = '#DCFCE7';
    text = theme.colors.success;
  } else if (normStatus === 'completed') {
    bg = '#E0E7FF';
    text = theme.colors.primaryDark;
  } else if (normStatus === 'pending') {
    bg = '#FEF3C7';
    text = theme.colors.warning;
  } else if (normStatus === 'booked') {
    bg = '#FEE2E2';
    text = theme.colors.error;
  }

  const label = normStatus.charAt(0).toUpperCase() + normStatus.slice(1);

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: theme.radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default StatusBadge;
