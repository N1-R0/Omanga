import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type HeaderVariant = 'default' | 'transparent' | 'gradient';
type HeaderSize = 'sm' | 'md' | 'lg';

interface HeaderAction {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

interface HeaderProps {
  title?: string;
  subtitle?: string;
  variant?: HeaderVariant;
  size?: HeaderSize;
  backgroundColor?: string;
  showBackButton?: boolean;
  backButtonIcon?: keyof typeof Ionicons.glyphMap;
  onBackPress?: () => void;
  leftAction?: HeaderAction;
  rightActions?: HeaderAction[];
  centerComponent?: React.ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  testID?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  variant = 'default',
  size = 'md',
  backgroundColor,
  showBackButton = false,
  backButtonIcon = 'arrow-back',
  onBackPress,
  leftAction,
  rightActions = [],
  centerComponent,
  style,
  titleStyle,
  subtitleStyle,
  statusBarStyle = 'dark-content',
  testID,
}) => {
  const insets = useSafeAreaInsets();

  const getHeaderHeight = (): number => {
    const sizeMap = {
      sm: 44,
      md: 56,
      lg: 72,
    };
    return sizeMap[size];
  };

  const getBackgroundColor = (): string => {
    if (backgroundColor) return backgroundColor;
    
    const variantMap = {
      default: '#ffffff',
      transparent: 'transparent',
      gradient: '#ffffff', // Will be overridden by gradient
    };
    return variantMap[variant];
  };

  const getTitleStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      color: variant === 'transparent' ? '#ffffff' : '#1a1a1a',
      textAlign: 'center',
    };

    const sizeStyles = {
      sm: { fontSize: 16 },
      md: { fontSize: 18 },
      lg: { fontSize: 22 },
    };

    return { ...baseStyle, ...sizeStyles[size] };
  };

  const getSubtitleStyles = (): TextStyle => {
    return {
      fontSize: size === 'sm' ? 12 : size === 'md' ? 14 : 16,
      color: variant === 'transparent' ? 'rgba(255, 255, 255, 0.8)' : '#666',
      textAlign: 'center',
      marginTop: 2,
    };
  };

  const getIconColor = (): string => {
    return variant === 'transparent' ? '#ffffff' : '#1a1a1a';
  };

  const getIconSize = (): number => {
    return size === 'sm' ? 20 : size === 'md' ? 24 : 28;
  };

  const renderLeftSection = () => {
    const leftElement = showBackButton ? (
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        testID={`${testID}-back-button`}
      >
        <Ionicons
          name={backButtonIcon}
          size={getIconSize()}
          color={getIconColor()}
        />
      </TouchableOpacity>
    ) : leftAction ? (
      <TouchableOpacity
        onPress={leftAction.onPress}
        style={styles.actionButton}
        accessibilityRole="button"
        accessibilityLabel={leftAction.accessibilityLabel}
        testID={leftAction.testID}
      >
        <Ionicons
          name={leftAction.icon}
          size={getIconSize()}
          color={getIconColor()}
        />
      </TouchableOpacity>
    ) : null;

    return (
      <View style={styles.leftSection}>
        {leftElement}
      </View>
    );
  };

  const renderCenterSection = () => {
    if (centerComponent) {
      return <View style={styles.centerSection}>{centerComponent}</View>;
    }

    if (!title && !subtitle) {
      return <View style={styles.centerSection} />;
    }

    return (
      <View style={styles.centerSection}>
        {title && (
          <Text
            style={[getTitleStyles(), titleStyle]}
            numberOfLines={1}
            testID={`${testID}-title`}
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text
            style={[getSubtitleStyles(), subtitleStyle]}
            numberOfLines={1}
            testID={`${testID}-subtitle`}
          >
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  const renderRightSection = () => {
    return (
      <View style={styles.rightSection}>
        {rightActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            style={[styles.actionButton, index > 0 && { marginLeft: 8 }]}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel}
            testID={action.testID}
          >
            <Ionicons
              name={action.icon}
              size={getIconSize()}
              color={getIconColor()}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={variant === 'transparent' ? 'transparent' : getBackgroundColor()}
        translucent={variant === 'transparent'}
      />
      <View
        style={[
          styles.container,
          {
            height: getHeaderHeight() + insets.top,
            paddingTop: insets.top,
            backgroundColor: getBackgroundColor(),
          },
          variant === 'transparent' && styles.transparentHeader,
          style,
        ]}
        testID={testID}
      >
        <View style={styles.content}>
          {renderLeftSection()}
          {renderCenterSection()}
          {renderRightSection()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transparentHeader: {
    borderBottomWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftSection: {
    width: 60,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  rightSection: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;