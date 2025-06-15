import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

const { width } = Dimensions.get('window');

type OTPInputVariant = 'default' | 'outline' | 'underline' | 'filled';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  onComplete?: (code: string) => void;
  variant?: OTPInputVariant;
  autoFocus?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  cellStyle?: ViewStyle;
  cellTextStyle?: TextStyle;
  focusedCellStyle?: ViewStyle;
  errorCellStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = '',
  onChangeText,
  onComplete,
  variant = 'default',
  autoFocus = true,
  placeholder = '',
  secureTextEntry = false,
  disabled = false,
  error = false,
  errorMessage,
  cellStyle,
  cellTextStyle,
  focusedCellStyle,
  errorCellStyle,
  containerStyle,
  testID = 'otp-input',
  accessibilityLabel = 'Enter verification code',
  accessibilityHint = 'Enter the verification code sent to your device',
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number>(autoFocus ? 0 : -1);
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  // Initialize OTP from value prop
  useEffect(() => {
    if (value) {
      const otpArray = value.split('').slice(0, length);
      const paddedOtp = [...otpArray, ...Array(length - otpArray.length).fill('')];
      setOtp(paddedOtp);
    }
  }, [value, length]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const getCellWidth = (): number => {
    const totalPadding = 32; // Container padding
    const totalSpacing = (length - 1) * 12; // Spacing between cells
    const availableWidth = width - totalPadding - totalSpacing;
    const maxCellWidth = 60;
    const calculatedWidth = Math.min(availableWidth / length, maxCellWidth);
    return Math.max(calculatedWidth, 40); // Minimum width
  };

  const getCellStyles = (index: number): ViewStyle => {
    const baseStyle: ViewStyle = {
      width: getCellWidth(),
      height: getCellWidth(),
      borderRadius: variant === 'underline' ? 0 : 12,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const variantStyles: Record<OTPInputVariant, ViewStyle> = {
      default: {
        backgroundColor: '#f8f9fa',
        borderWidth: 2,
        borderColor: '#e9ecef',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#e9ecef',
      },
      underline: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: 2,
        borderBottomColor: '#e9ecef',
        borderRadius: 0,
      },
      filled: {
        backgroundColor: '#e9ecef',
        borderWidth: 0,
      },
    };

    let cellStyles = { ...baseStyle, ...variantStyles[variant] };

    // Apply focused styles
    if (focusedIndex === index) {
      if (focusedCellStyle) {
        cellStyles = { ...cellStyles, ...focusedCellStyle };
      } else {
        cellStyles.borderColor = '#007bff';
        if (variant === 'default' || variant === 'filled') {
          cellStyles.backgroundColor = '#ffffff';
        }
      }
    }

    // Apply filled styles
    if (otp[index]) {
      cellStyles.borderColor = error ? '#dc3545' : '#28a745';
      if (variant === 'default') {
        cellStyles.backgroundColor = '#ffffff';
      }
    }

    // Apply error styles
    if (error) {
      if (errorCellStyle) {
        cellStyles = { ...cellStyles, ...errorCellStyle };
      } else {
        cellStyles.borderColor = '#dc3545';
      }
    }

    // Apply disabled styles
    if (disabled) {
      cellStyles.opacity = 0.6;
      cellStyles.backgroundColor = '#f0f0f0';
    }

    return cellStyles;
  };

  const getCellTextStyles = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: 24,
      fontWeight: 'bold',
      color: disabled ? '#999' : '#1a1a1a',
      textAlign: 'center',
    };

    return cellTextStyle ? { ...baseStyle, ...cellTextStyle } : baseStyle;
  };

  const handleChangeText = (text: string, index: number) => {
    if (disabled) return;

    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    
    if (numericText.length > 1) {
      // Handle paste operation
      handlePaste(numericText, index);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChangeText?.(otpString);

    // Auto-focus next input
    if (numericText && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '') && otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handlePaste = (pastedText: string, startIndex: number) => {
    const digits = pastedText.slice(0, length);
    const newOtp = [...otp];
    
    for (let i = 0; i < digits.length && startIndex + i < length; i++) {
      newOtp[startIndex + i] = digits[i];
    }
    
    setOtp(newOtp);
    onChangeText?.(newOtp.join(''));
    
    // Focus the next empty cell or the last cell
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex]?.focus();
    setFocusedIndex(focusIndex);

    // Check if OTP is complete
    if (newOtp.every(digit => digit !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (disabled) return;

    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index]) {
        // Clear current cell
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChangeText?.(newOtp.join(''));
      } else if (index > 0) {
        // Move to previous cell and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChangeText?.(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const handleCellPress = (index: number) => {
    if (disabled) return;
    inputRefs.current[index]?.focus();
  };

  const renderErrorMessage = () => {
    if (!error || !errorMessage) return null;

    return (
      <Text style={styles.errorMessage} testID={`${testID}-error`}>
        {errorMessage}
      </Text>
    );
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      <View style={styles.otpContainer}>
        {Array(length).fill(0).map((_, index) => (
          <TouchableOpacity
            key={index}
            style={getCellStyles(index)}
            onPress={() => handleCellPress(index)}
            activeOpacity={0.8}
            testID={`${testID}-cell-${index}`}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.hiddenInput, getCellTextStyles()]}
              value={otp[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              contextMenuHidden
              secureTextEntry={secureTextEntry}
              editable={!disabled}
              accessibilityLabel={`${accessibilityLabel} digit ${index + 1}`}
              accessibilityHint={accessibilityHint}
              testID={`${testID}-input-${index}`}
            />
            {!otp[index] && placeholder && (
              <Text style={[styles.placeholderText, getCellTextStyles()]}>
                {placeholder}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      {renderErrorMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  hiddenInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    textAlign: 'center',
  },
  placeholderText: {
    opacity: 0.5,
    position: 'absolute',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default OTPInput;