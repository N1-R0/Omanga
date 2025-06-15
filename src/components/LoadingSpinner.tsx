import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

type SpinnerSize = 'small' | 'medium' | 'large';
type SpinnerVariant = 'default' | 'dots' | 'pulse' | 'custom';

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
  backgroundColor?: string;
  overlay?: boolean;
  overlayColor?: string;
  visible?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  variant = 'default',
  color = '#007bff',
  backgroundColor,
  overlay = false,
  overlayColor = 'rgba(0, 0, 0, 0.5)',
  visible = true,
  style,
  testID = 'loading-spinner',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const dotValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const getSizeValue = (): number => {
    const sizeMap = {
      small: 20,
      medium: 40,
      large: 60,
    };
    return sizeMap[size];
  };

  // Spinning animation
  useEffect(() => {
    if (!visible) return;

    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, [visible, spinValue]);

  // Pulse animation
  useEffect(() => {
    if (!visible || variant !== 'pulse') return;

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, [visible, variant, pulseValue]);

  // Dots animation
  useEffect(() => {
    if (!visible || variant !== 'dots') return;

    const createDotAnimation = (dotValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dotValue, {
            toValue: 1,
            duration: 400,
            delay,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dotValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animations = dotValues.map((dotValue, index) =>
      createDotAnimation(dotValue, index * 200)
    );

    Animated.parallel(animations).start();

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, [visible, variant, dotValues]);

  if (!visible) return null;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderSpinner = () => {
    const spinnerSize = getSizeValue();

    switch (variant) {
      case 'default':
        return (
          <ActivityIndicator
            size={size === 'small' ? 'small' : 'large'}
            color={color}
            testID={`${testID}-activity-indicator`}
          />
        );

      case 'custom':
        return (
          <Animated.View
            style={[
              styles.customSpinner,
              {
                width: spinnerSize,
                height: spinnerSize,
                borderColor: `${color}30`,
                borderTopColor: color,
                transform: [{ rotate: spin }],
              },
            ]}
            testID={`${testID}-custom-spinner`}
          />
        );

      case 'pulse':
        return (
          <Animated.View
            style={[
              styles.pulseSpinner,
              {
                width: spinnerSize,
                height: spinnerSize,
                backgroundColor: color,
                transform: [{ scale: pulseValue }],
              },
            ]}
            testID={`${testID}-pulse-spinner`}
          />
        );

      case 'dots':
        return (
          <View style={styles.dotsContainer} testID={`${testID}-dots-container`}>
            {dotValues.map((dotValue, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: spinnerSize / 4,
                    height: spinnerSize / 4,
                    backgroundColor: color,
                    opacity: dotValue,
                    transform: [
                      {
                        scale: dotValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.5, 1],
                        }),
                      },
                    ],
                  },
                ]}
                testID={`${testID}-dot-${index}`}
              />
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  const spinnerContent = (
    <View
      style={[
        styles.container,
        backgroundColor && { backgroundColor },
        style,
      ]}
      testID={testID}
    >
      {renderSpinner()}
    </View>
  );

  if (overlay) {
    return (
      <View style={[styles.overlay, { backgroundColor: overlayColor }]}>
        {spinnerContent}
      </View>
    );
  }

  return spinnerContent;
};

// Pre-defined spinner variants
export const OverlaySpinner: React.FC<Omit<LoadingSpinnerProps, 'overlay'>> = (props) => (
  <LoadingSpinner {...props} overlay />
);

export const CustomSpinner: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner {...props} variant="custom" />
);

export const PulseSpinner: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner {...props} variant="pulse" />
);

export const DotsSpinner: React.FC<Omit<LoadingSpinnerProps, 'variant'>> = (props) => (
  <LoadingSpinner {...props} variant="dots" />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  customSpinner: {
    borderWidth: 3,
    borderRadius: 50,
  },
  pulseSpinner: {
    borderRadius: 50,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  dot: {
    borderRadius: 50,
    marginHorizontal: 2,
  },
});

export default LoadingSpinner;