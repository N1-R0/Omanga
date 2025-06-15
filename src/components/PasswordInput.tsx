import React, { useState, forwardRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import TextInput, { TextInputProps } from './TextInput';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry' | 'rightIcon' | 'onRightIconPress'> {
  showPasswordToggle?: boolean;
  passwordStrengthIndicator?: boolean;
  onPasswordStrengthChange?: (strength: PasswordStrength) => void;
}

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>(({
  showPasswordToggle = true,
  passwordStrengthIndicator = false,
  onPasswordStrengthChange,
  value = '',
  onChangeText,
  ...props
}, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('weak');

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    if (!password) return 'weak';
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1; // lowercase
    if (/[A-Z]/.test(password)) score += 1; // uppercase
    if (/[0-9]/.test(password)) score += 1; // numbers
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // special characters
    
    // Return strength based on score
    if (score <= 2) return 'weak';
    if (score <= 3) return 'fair';
    if (score <= 4) return 'good';
    return 'strong';
  };

  const handlePasswordChange = (text: string) => {
    onChangeText?.(text);
    
    if (passwordStrengthIndicator) {
      const strength = calculatePasswordStrength(text);
      setPasswordStrength(strength);
      onPasswordStrengthChange?.(strength);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const getPasswordStrengthColor = (): string => {
    const colorMap = {
      weak: '#dc3545',
      fair: '#fd7e14',
      good: '#ffc107',
      strong: '#28a745',
    };
    return colorMap[passwordStrength];
  };

  const getPasswordStrengthText = (): string => {
    const textMap = {
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
    };
    return textMap[passwordStrength];
  };

  const getPasswordHelperText = (): string => {
    if (!passwordStrengthIndicator || !value) {
      return props.helperText || '';
    }

    const strengthText = getPasswordStrengthText();
    const suggestions = [];

    if (value.length < 8) suggestions.push('at least 8 characters');
    if (!/[a-z]/.test(value)) suggestions.push('lowercase letter');
    if (!/[A-Z]/.test(value)) suggestions.push('uppercase letter');
    if (!/[0-9]/.test(value)) suggestions.push('number');
    if (!/[^A-Za-z0-9]/.test(value)) suggestions.push('special character');

    if (suggestions.length === 0) {
      return `Password strength: ${strengthText}`;
    }

    return `Password strength: ${strengthText}. Add ${suggestions.slice(0, 2).join(', ')}.`;
  };

  return (
    <TextInput
      ref={ref}
      {...props}
      value={value}
      onChangeText={handlePasswordChange}
      secureTextEntry={!isPasswordVisible}
      rightIcon={showPasswordToggle ? (isPasswordVisible ? 'eye-off-outline' : 'eye-outline') : undefined}
      onRightIconPress={showPasswordToggle ? togglePasswordVisibility : undefined}
      helperText={getPasswordHelperText()}
      accessibilityLabel={props.accessibilityLabel || 'Password input'}
      accessibilityHint={props.accessibilityHint || 'Enter your password. Double tap the eye icon to toggle visibility.'}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;