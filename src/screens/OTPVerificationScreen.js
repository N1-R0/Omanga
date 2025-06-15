import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Get phone number from previous screen
  const phoneNumber = route?.params?.phoneNumber || '+2348123456789';
  const maskedPhoneNumber = phoneNumber.replace(/(\+234)(\d{3})(\d{4})(\d{4})/, '$1$2***$4');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all fields are filled
    if (newOtp.every(digit => digit !== '') && value) {
      setTimeout(() => verifyOtp(newOtp.join('')), 100);
    }
  };

  const handleKeyPress = (e, index) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = (otpCode) => {
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a complete 6-digit code');
      return;
    }

    // For prototype, accept any 6-digit code
    Alert.alert(
      'Verification Successful!', 
      'Your account has been verified successfully.',
      [
        { 
          text: 'Continue', 
          onPress: () => navigation.navigate('PackageSelection')
        }
      ]
    );
  };

  const resendOtp = () => {
    if (!canResend) return;
    
    // Reset timer and OTP
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    
    // Focus first input
    inputRefs.current[0]?.focus();
    
    Alert.alert('Code Sent', 'A new verification code has been sent to your phone.');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Image with Blur Effect */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
        }}
        style={styles.backgroundImage}
        blurRadius={8}
      >
        {/* Dark Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        />
        
        {/* OTP Form Container */}
        <View style={styles.formContainer}>
          <View style={styles.otpCard}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>OTP Verification</Text>
            </View>
            
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsText}>
                Enter the Verification code sent to
              </Text>
              <Text style={styles.phoneNumber}>{maskedPhoneNumber}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.wrongNumberText}>Wrong Number?</Text>
              </TouchableOpacity>
            </View>
            
            {/* OTP Input Fields */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : {},
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  textAlign="center"
                />
              ))}
            </View>
            
            {/* Resend Code Section */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't Receive a code?{' '}
                <TouchableOpacity 
                  onPress={resendOtp}
                  disabled={!canResend}
                  style={styles.resendButton}
                >
                  <Text style={[
                    styles.resendLink,
                    !canResend && styles.resendLinkDisabled
                  ]}>
                    Resend
                  </Text>
                </TouchableOpacity>
              </Text>
              
              {!canResend && (
                <Text style={styles.timerText}>
                  Resend available in {formatTime(timer)}
                </Text>
              )}
            </View>
            
            {/* Verify Button */}
            <TouchableOpacity 
              style={[
                styles.verifyButton,
                otp.every(digit => digit !== '') ? styles.verifyButtonActive : styles.verifyButtonInactive
              ]}
              onPress={() => verifyOtp(otp.join(''))}
              activeOpacity={0.8}
            >
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  otpCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  instructionsContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    marginBottom: 12,
  },
  wrongNumberText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  otpInput: {
    width: (width - 120) / 6,
    height: 56,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: '#000',
    backgroundColor: '#fff',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 4,
  },
  resendLink: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: '#ccc',
  },
  timerText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  verifyButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  verifyButtonActive: {
    backgroundColor: '#000',
  },
  verifyButtonInactive: {
    backgroundColor: '#ccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;