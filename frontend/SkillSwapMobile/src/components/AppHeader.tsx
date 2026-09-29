import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../constants/theme';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onMenu?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onMenu,
  rightAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftRow}>
        {Boolean(onBack) && (
          <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
            <Text style={styles.iconText}>←</Text>
          </TouchableOpacity>
        )}
        {Boolean(onMenu) && !onBack && (
          <TouchableOpacity style={styles.iconBtn} onPress={onMenu}>
            <Text style={styles.iconText}>☰</Text>
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {Boolean(subtitle) && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {Boolean(rightAction) && <View style={styles.rightRow}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    padding: 6,
    marginRight: 8,
  },
  iconText: {
    fontSize: 20,
    color: theme.colors.text,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.mutedText,
  },
});

export default AppHeader;
