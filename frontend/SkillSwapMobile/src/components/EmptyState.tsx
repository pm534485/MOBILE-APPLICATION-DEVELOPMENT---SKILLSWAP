import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../constants/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {Boolean(actionText) && Boolean(onActionPress) && (
        <TouchableOpacity style={styles.actionBtn} onPress={onActionPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    color: theme.colors.mutedText,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 260,
    marginBottom: 16,
  },
  actionBtn: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.radius.md,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
});

export default EmptyState;
