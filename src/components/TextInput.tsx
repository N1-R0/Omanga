import React, { useState, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'outline' | 'filled' | 'underline';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  variant = 'default',
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  labelStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...textInputProps
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const getSizeStyles = () => {
    const sizeMap = {
      sm: { fontSize: 14, paddingVertical: 8, paddingHorizontal: 12 },
      md: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 16 },
      lg: { fontSize: 18, paddingVertical: 16, paddingHorizontal: 20 },
    };
    return sizeMap[size];
  };

  const getVariantStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
      ...getSizeStyles(),
    };

    const variantMap: Record<InputVariant, ViewStyle> = {
      default: {
        backgroundColor: disabled ? '#f0f0f0' : '#f8f9fa',
        borderWidth: 1,
        borderColor: error ? '#dc3545' : isFocused ? '#007bff' : '#e9ecef',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: error ? '#dc3545' : isFocused ? '#007bff' : '#e9ecef',
      },
      filled: {
        backgroundColor: disabled ? '#f0f0f0' : '#e9ecef',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: error ? '#dc3545' : isFocused ? '#007bff' : 'transparent',
        borderRadius: 0,
        borderTopLeftRadius: baseStyle.borderRadius,
        borderTopRightRadius: baseStyle.borderRadius,
      },
      underline: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: error ? '#dc3545' : isFocused ? '#007bff' : '#e9ecef',
        borderRadius: 0,
        paddingHorizontal: 0,
      },
    };

    return { ...baseStyle, ...variantMap[variant] };
  };

  const getIconSize = (): number => {
    return size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  };

  const getIconColor = (): string => {
    if (disabled) return '#ccc';
    if (error) return '#dc3545';
    if (isFocused) return '#007bff';
    return '#666';
  };

  const renderLabel = () => {
    if (!label) return null;

    return (
      <Text style={[styles.label, labelStyle, error && styles.labelError]}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
    );
  };

  const renderHelperText = () => {
    const text = error || helperText;
    if (!text) return null;

    return (
      <Text 
        style={[styles.helperText, error && styles.errorText]}
        testID={`${testID}-helper-text`}
      >
        {text}
      </Text>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {renderLabel()}
      
      <View style={[styles.inputContainer, getVariantStyles()]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={getIconSize()}
            color={getIconColor()}
            style={styles.leftIcon}
          />
        )}
        
        <RNTextInput
          ref={ref}
          style={[
            styles.input,
            inputStyle,
            {
              fontSize: getSizeStyles().fontSize,
              color: disabled ? '#999' : '#1a1a1a',
            },
            leftIcon && { paddingLeft: 0 },
            rightIcon && { paddingRight: 0 },
          ]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          selectTextOnFocus={!disabled}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityHint={accessibilityHint}
          accessibilityState={{
            disabled,
            selected: isFocused,
          }}
          testID={`${testID}-input`}
          {...textInputProps}
        />
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={disabled || !onRightIconPress}
            style={styles.rightIconContainer}
            accessibilityRole="button"
            accessibilityLabel="Toggle input"
            testID={`${testID}-right-icon`}
          >
            <Ionicons
              name={rightIcon}
              size={getIconSize()}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {renderHelperText()}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  labelError: {
    color: '#dc3545',
  },
  required: {
    color: '#dc3545',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIconContainer: {
    padding: 4,
    marginLeft: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: '#dc3545',
  },
});

TextInput.displayName = 'TextInput';

export default TextInput;