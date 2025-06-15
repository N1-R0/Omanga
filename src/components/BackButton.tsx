import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type BackButtonVariant = 'default' | 'circle' | 'square' | 'transparent';
type BackButtonSize = 'sm' | 'md' | 'lg';

interface BackButtonProps {
  onPress?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: BackButtonVariant;
  size?: BackButtonSize;
  color?: string;
  backgroundColor?: string;
  position?: 'relative' | 'absolute';
  absolutePosition?: {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
  };
  style?: ViewStyle;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  icon = 'arrow-back',
  variant = 'default',
  size = 'md',
  color,
  backgroundColor,
  position = 'relative',
  absolutePosition = { top: 50, left: 20 },
  style,
  disabled = false,
  testID = 'back-button',
  accessibilityLabel = 'Go back',
  accessibilityHint = 'Navigate to the previous screen',
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const getButtonSize = (): number => {
    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 48,
    };
    return sizeMap[size];
  };

  const getIconSize = (): number => {
    const sizeMap = {
      sm: 16,
      md: 20,
      lg: 24,
    };
    return sizeMap[size];
  };

  const getIconColor = (): string => {
    if (color) return color;
    
    if (variant === 'transparent') return '#ffffff';
    return '#1a1a1a';
  };

  const getBackgroundColor = (): string => {
    if (backgroundColor) return backgroundColor;
    
    const variantMap = {
      default: 'transparent',
      circle: '#ffffff',
      square: '#ffffff',
      transparent: 'rgba(0, 0, 0, 0.3)',
    };
    return variantMap[variant];
  };

  const getBorderRadius = (): number => {
    const buttonSize = getButtonSize();
    
    const variantMap = {
      default: 0,
      circle: buttonSize / 2,
      square: 8,
      transparent: buttonSize / 2,
    };
    return variantMap[variant];
  };

  const getShadowStyle = (): ViewStyle => {
    if (variant === 'default' || variant === 'transparent') {
      return {};
    }
    
    return {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    };
  };

  const buttonSize = getButtonSize();
  
  const buttonStyle: ViewStyle = {
    width: buttonSize,
    height: buttonSize,
    borderRadius: getBorderRadius(),
    backgroundColor: getBackgroundColor(),
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadowStyle(),
    ...(position === 'absolute' && {
      position: 'absolute',
      ...absolutePosition,
      zIndex: 1000,
    }),
    ...(disabled && {
      opacity: 0.5,
    }),
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <Ionicons
        name={icon}
        size={getIconSize()}
        color={getIconColor()}
      />
    </TouchableOpacity>
  );
};

// Pre-defined variants for common use cases
export const CircleBackButton: React.FC<Omit<BackButtonProps, 'variant'>> = (props) => (
  <BackButton {...props} variant="circle" />
);

export const TransparentBackButton: React.FC<Omit<BackButtonProps, 'variant'>> = (props) => (
  <BackButton {...props} variant="transparent" />
);

export const FloatingBackButton: React.FC<Omit<BackButtonProps, 'position' | 'variant'>> = (props) => (
  <BackButton {...props} variant="circle" position="absolute" />
);

const styles = StyleSheet.create({
  // Additional styles if needed
});

export default BackButton;