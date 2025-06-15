import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';

type RadioButtonSize = 'sm' | 'md' | 'lg';
type RadioButtonVariant = 'default' | 'outline' | 'minimal';

interface RadioButtonOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

interface RadioButtonProps {
  options: RadioButtonOption[];
  selectedValue?: string | number;
  onSelectionChange: (value: string | number) => void;
  size?: RadioButtonSize;
  variant?: RadioButtonVariant;
  direction?: 'row' | 'column';
  spacing?: number;
  activeColor?: string;
  inactiveColor?: string;
  textColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  optionStyle?: ViewStyle;
  labelStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  testID?: string;
  accessibilityLabel?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selectedValue,
  onSelectionChange,
  size = 'md',
  variant = 'default',
  direction = 'column',
  spacing = 12,
  activeColor = '#007bff',
  inactiveColor = '#e9ecef',
  textColor = '#1a1a1a',
  disabled = false,
  style,
  optionStyle,
  labelStyle,
  descriptionStyle,
  testID = 'radio-button',
  accessibilityLabel = 'Radio button group',
}) => {
  const getSizeStyles = () => {
    const sizeMap = {
      sm: {
        radioSize: 16,
        innerSize: 8,
        fontSize: 14,
        descriptionSize: 12,
      },
      md: {
        radioSize: 20,
        innerSize: 10,
        fontSize: 16,
        descriptionSize: 14,
      },
      lg: {
        radioSize: 24,
        innerSize: 12,
        fontSize: 18,
        descriptionSize: 16,
      },
    };
    return sizeMap[size];
  };

  const getRadioStyles = (isSelected: boolean, isDisabled: boolean): ViewStyle => {
    const sizeStyles = getSizeStyles();
    const baseStyle: ViewStyle = {
      width: sizeStyles.radioSize,
      height: sizeStyles.radioSize,
      borderRadius: sizeStyles.radioSize / 2,
      marginRight: 12,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const variantStyles: Record<RadioButtonVariant, ViewStyle> = {
      default: {
        borderWidth: 2,
        borderColor: isSelected ? activeColor : inactiveColor,
        backgroundColor: 'transparent',
      },
      outline: {
        borderWidth: 2,
        borderColor: isSelected ? activeColor : inactiveColor,
        backgroundColor: isSelected ? `${activeColor}20` : 'transparent',
      },
      minimal: {
        borderWidth: 1,
        borderColor: isSelected ? activeColor : inactiveColor,
        backgroundColor: isSelected ? activeColor : 'transparent',
      },
    };

    let radioStyles = { ...baseStyle, ...variantStyles[variant] };

    if (isDisabled) {
      radioStyles.opacity = 0.5;
      radioStyles.borderColor = '#ccc';
    }

    return radioStyles;
  };

  const getInnerRadioStyles = (isSelected: boolean): ViewStyle => {
    const sizeStyles = getSizeStyles();
    return {
      width: sizeStyles.innerSize,
      height: sizeStyles.innerSize,
      borderRadius: sizeStyles.innerSize / 2,
      backgroundColor: variant === 'minimal' ? '#ffffff' : activeColor,
      opacity: isSelected ? 1 : 0,
    };
  };

  const getLabelStyles = (isDisabled: boolean): TextStyle => {
    const sizeStyles = getSizeStyles();
    return {
      fontSize: sizeStyles.fontSize,
      color: isDisabled ? '#999' : textColor,
      fontWeight: '600',
      flex: 1,
    };
  };

  const getDescriptionStyles = (isDisabled: boolean): TextStyle => {
    const sizeStyles = getSizeStyles();
    return {
      fontSize: sizeStyles.descriptionSize,
      color: isDisabled ? '#999' : '#666',
      marginTop: 4,
      lineHeight: sizeStyles.descriptionSize * 1.4,
    };
  };

  const handleOptionPress = (option: RadioButtonOption) => {
    if (disabled || option.disabled) return;
    onSelectionChange(option.value);
  };

  const renderOption = (option: RadioButtonOption, index: number) => {
    const isSelected = selectedValue === option.value;
    const isDisabled = disabled || option.disabled;

    return (
      <TouchableOpacity
        key={option.value}
        style={[
          styles.option,
          {
            marginBottom: direction === 'column' ? spacing : 0,
            marginRight: direction === 'row' ? spacing : 0,
            flex: direction === 'row' ? 1 : undefined,
          },
          optionStyle,
        ]}
        onPress={() => handleOptionPress(option)}
        disabled={isDisabled}
        activeOpacity={0.8}
        accessibilityRole="radio"
        accessibilityState={{ 
          selected: isSelected,
          disabled: isDisabled,
        }}
        accessibilityLabel={option.label}
        accessibilityHint={option.description}
        testID={`${testID}-option-${index}`}
      >
        <View style={styles.optionContent}>
          {/* Radio Circle */}
          <View style={getRadioStyles(isSelected, isDisabled)}>
            <Animated.View style={getInnerRadioStyles(isSelected)} />
          </View>

          {/* Text Content */}
          <View style={styles.textContent}>
            <Text 
              style={[getLabelStyles(isDisabled), labelStyle]}
              testID={`${testID}-label-${index}`}
            >
              {option.label}
            </Text>
            
            {option.description && (
              <Text 
                style={[getDescriptionStyles(isDisabled), descriptionStyle]}
                testID={`${testID}-description-${index}`}
              >
                {option.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          flexWrap: direction === 'row' ? 'wrap' : 'nowrap',
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option, index) => renderOption(option, index))}
    </View>
  );
};

// Pre-defined radio button variants
export const OutlineRadioButton: React.FC<Omit<RadioButtonProps, 'variant'>> = (props) => (
  <RadioButton {...props} variant="outline" />
);

export const MinimalRadioButton: React.FC<Omit<RadioButtonProps, 'variant'>> = (props) => (
  <RadioButton {...props} variant="minimal" />
);

export const HorizontalRadioButton: React.FC<Omit<RadioButtonProps, 'direction'>> = (props) => (
  <RadioButton {...props} direction="row" />
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  option: {
    // Individual option styles handled dynamically
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default RadioButton;