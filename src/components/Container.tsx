import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

type PaddingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type MarginSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ContainerProps {
  children: React.ReactNode;
  padding?: PaddingSize;
  paddingHorizontal?: PaddingSize;
  paddingVertical?: PaddingSize;
  margin?: MarginSize;
  marginHorizontal?: MarginSize;
  marginVertical?: MarginSize;
  backgroundColor?: string;
  style?: ViewStyle;
  flex?: boolean;
  center?: boolean;
  centerHorizontal?: boolean;
  centerVertical?: boolean;
  testID?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  padding = 'md',
  paddingHorizontal,
  paddingVertical,
  margin = 'none',
  marginHorizontal,
  marginVertical,
  backgroundColor,
  style,
  flex = false,
  center = false,
  centerHorizontal = false,
  centerVertical = false,
  testID,
}) => {
  const getSpacing = (size: PaddingSize | MarginSize): number => {
    const spacingMap = {
      none: 0,
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    };
    return spacingMap[size];
  };

  const containerStyle: ViewStyle = {
    ...(flex && { flex: 1 }),
    ...(backgroundColor && { backgroundColor }),
    
    // Padding
    ...(padding !== 'none' && { padding: getSpacing(padding) }),
    ...(paddingHorizontal && { paddingHorizontal: getSpacing(paddingHorizontal) }),
    ...(paddingVertical && { paddingVertical: getSpacing(paddingVertical) }),
    
    // Margin
    ...(margin !== 'none' && { margin: getSpacing(margin) }),
    ...(marginHorizontal && { marginHorizontal: getSpacing(marginHorizontal) }),
    ...(marginVertical && { marginVertical: getSpacing(marginVertical) }),
    
    // Alignment
    ...(center && { justifyContent: 'center', alignItems: 'center' }),
    ...(centerHorizontal && !center && { alignItems: 'center' }),
    ...(centerVertical && !center && { justifyContent: 'center' }),
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {children}
    </View>
  );
};

// Pre-defined container variants for common use cases
export const ScreenContainer: React.FC<Omit<ContainerProps, 'padding' | 'flex'>> = (props) => (
  <Container {...props} padding="lg" flex />
);

export const SectionContainer: React.FC<Omit<ContainerProps, 'paddingVertical'>> = (props) => (
  <Container {...props} paddingVertical="lg" />
);

export const CardContainer: React.FC<Omit<ContainerProps, 'padding' | 'backgroundColor'>> = (props) => (
  <Container {...props} padding="lg" backgroundColor="#ffffff" />
);

const styles = StyleSheet.create({
  // Any additional styles if needed
});

export default Container;