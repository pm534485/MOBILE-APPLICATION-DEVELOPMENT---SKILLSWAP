import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../constants/theme';

interface CategoryCardProps {
  name: string;
  icon: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  icon,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
      ]}
      onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: theme.radius.pill,
    borderWidth: 1.2,
    borderColor: theme.colors.border,
    marginRight: 10,
  },
  chipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  icon: {
    fontSize: 15,
    marginRight: 6,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  nameSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default CategoryCard;
