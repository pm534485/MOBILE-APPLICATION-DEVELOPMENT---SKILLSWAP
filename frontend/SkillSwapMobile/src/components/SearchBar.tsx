import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search gigs, skills, or campus freelancers...',
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.mutedText}
        returnKeyType="search"
      />
      {Boolean(value) && (
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            onChangeText('');
            if (onClear) onClear();
          }}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: theme.radius.xl,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 48,
    ...theme.shadow.card,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    height: '100%',
  },
  clearBtn: {
    padding: 6,
  },
  clearText: {
    fontSize: 14,
    color: theme.colors.mutedText,
    fontWeight: '700',
  },
});

export default SearchBar;
