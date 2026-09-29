import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../constants/theme';

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerStyle,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.mutedText}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
  },
  eyeButton: {
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  eyeText: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  errorText: {
    fontSize: 11,
    color: theme.colors.error,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default InputField;
