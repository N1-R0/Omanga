import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const isDisabled = disabled || loading;

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
      paddingHorizontal: size === 'sm' ? 16 : size === 'md' ? 24 : 32,
      paddingVertical: size === 'sm' ? 8 : size === 'md' ? 12 : 16,
      ...(fullWidth && { width: '100%' }),
    };

    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: isDisabled ? '#ccc' : '#000000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: isDisabled ? 0 : 4 },
        shadowOpacity: isDisabled ? 0 : 0.3,
        shadowRadius: isDisabled ? 0 : 8,
        elevation: isDisabled ? 0 : 6,
      },
      secondary: {
        backgroundColor: isDisabled ? '#f0f0f0' : '#6c757d',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: isDisabled ? 0 : 2 },
        shadowOpacity: isDisabled ? 0 : 0.2,
        shadowRadius: isDisabled ? 0 : 4,
        elevation: isDisabled ? 0 : 3,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: isDisabled ? '#ccc' : '#000000',
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      danger: {
        backgroundColor: isDisabled ? '#f8d7da' : '#dc3545',
        shadowColor: '#dc3545',
        shadowOffset: { width: 0, height: isDisabled ? 0 : 2 },
        shadowOpacity: isDisabled ? 0 : 0.3,
        shadowRadius: isDisabled ? 0 : 4,
        elevation: isDisabled ? 0 : 3,
      },
    };

    return { ...baseStyle, ...variantStyles[variant] };
  };

  const getTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
      fontWeight: '600',
      textAlign: 'center',
    };

    const variantTextStyles: Record<ButtonVariant, TextStyle> = {
      primary: {
        color: isDisabled ? '#666' : '#ffffff',
      },
      secondary: {
        color: isDisabled ? '#999' : '#ffffff',
      },
      outline: {
        color: isDisabled ? '#ccc' : '#000000',
      },
      ghost: {
        color: isDisabled ? '#ccc' : '#007bff',
      },
      danger: {
        color: isDisabled ? '#721c24' : '#ffffff',
      },
    };

    return { ...baseStyle, ...variantTextStyles[variant] };
  };

  const getIconSize = (): number => {
    return size === 'sm' ? 16 : size === 'md' ? 20 : 24;
  };

  const getIconColor = (): string => {
    const variantIconColors: Record<ButtonVariant, string> = {
      primary: isDisabled ? '#666' : '#ffffff',
      secondary: isDisabled ? '#999' : '#ffffff',
      outline: isDisabled ? '#ccc' : '#000000',
      ghost: isDisabled ? '#ccc' : '#007bff',
      danger: isDisabled ? '#721c24' : '#ffffff',
    };
    return variantIconColors[variant];
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={getIconColor()}
          testID={`${testID}-loading`}
        />
      );
    }

    const iconElement = icon && (
      <Ionicons
        name={icon}
        size={getIconSize()}
        color={getIconColor()}
        style={[
          iconPosition === 'left' && { marginRight: 8 },
          iconPosition === 'right' && { marginLeft: 8 },
        ]}
      />
    );

    const textElement = (
      <Text style={[getTextStyles(), textStyle]} numberOfLines={1}>
        {title}
      </Text>
    );

    return (
      <>
        {iconPosition === 'left' && iconElement}
        {textElement}
        {iconPosition === 'right' && iconElement}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

// Pre-defined button variants for common use cases
export const SecondaryButton: React.FC<Omit<PrimaryButtonProps, 'variant'>> = (props) => (
  <PrimaryButton {...props} variant="secondary" />
);

export const OutlineButton: React.FC<Omit<PrimaryButtonProps, 'variant'>> = (props) => (
  <PrimaryButton {...props} variant="outline" />
);

export const DangerButton: React.FC<Omit<PrimaryButtonProps, 'variant'>> = (props) => (
  <PrimaryButton {...props} variant="danger" />
);

export const GhostButton: React.FC<Omit<PrimaryButtonProps, 'variant'>> = (props) => (
  <PrimaryButton {...props} variant="ghost" />
);

const styles = StyleSheet.create({
  // Any additional styles if needed
});

export default PrimaryButton;