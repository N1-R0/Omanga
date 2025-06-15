import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
  AccessibilityRole,
} from 'react-native';

type ShadowIntensity = 'none' | 'light' | 'medium' | 'heavy';
type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface CardProps {
  children: React.ReactNode;
  backgroundColor?: string;
  borderRadius?: BorderRadius;
  shadow?: ShadowIntensity;
  borderWidth?: number;
  borderColor?: string;
  padding?: number;
  margin?: number;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
}

const Card: React.FC<CardProps> = ({
  children,
  backgroundColor = '#ffffff',
  borderRadius = 'lg',
  shadow = 'medium',
  borderWidth = 0,
  borderColor = '#e9ecef',
  padding = 16,
  margin = 0,
  style,
  onPress,
  disabled = false,
  testID,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}) => {
  const getBorderRadius = (size: BorderRadius): number => {
    const radiusMap = {
      none: 0,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      full: 999,
    };
    return radiusMap[size];
  };

  const getShadowStyle = (intensity: ShadowIntensity): ViewStyle => {
    const shadowMap = {
      none: {},
      light: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
      },
      heavy: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
      },
    };
    return shadowMap[intensity];
  };

  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius: getBorderRadius(borderRadius),
    padding,
    margin,
    borderWidth,
    borderColor: borderWidth > 0 ? borderColor : 'transparent',
    ...getShadowStyle(shadow),
  };

  const commonProps = {
    style: [cardStyle, style],
    testID,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole: accessibilityRole || (onPress ? 'button' : undefined),
  };

  if (onPress) {
    return (
      <TouchableOpacity
        {...commonProps}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        accessibilityState={{ disabled }}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View {...commonProps}>{children}</View>;
};

// Pre-defined card variants for common use cases
export const ActionCard: React.FC<Omit<CardProps, 'onPress'> & { onPress: (event: GestureResponderEvent) => void }> = (props) => (
  <Card {...props} accessibilityRole="button" />
);

export const InfoCard: React.FC<CardProps> = (props) => (
  <Card {...props} shadow="light" backgroundColor="#f8f9fa" />
);

export const HighlightCard: React.FC<CardProps> = (props) => (
  <Card {...props} shadow="heavy" borderRadius="xl" />
);

export const OutlineCard: React.FC<CardProps> = (props) => (
  <Card {...props} shadow="none" borderWidth={1} borderColor="#e9ecef" />
);

const styles = StyleSheet.create({
  // Any additional styles if needed
});

export default Card;