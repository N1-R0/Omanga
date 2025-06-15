import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      image: require('../../assets/onboardingScreenImage/obs1.png'),
      title: 'Welcome to Omanga',
      subtitle: 'Your gateway to seamless travel experiences in Nigeria. Convert currency and manage payments effortlessly.',
    },
    {
      id: 2,
      image: require('../../assets/onboardingScreenImage/obs2.png'),
      title: 'Smart Currency Exchange',
      subtitle: 'Get the best exchange rates and convert your money instantly with our trusted partners.',
    },
    {
      id: 3,
      image: require('../../assets/onboardingScreenImage/obs3.png'),
      title: 'Secure & Protected',
      subtitle: 'Travel with confidence knowing you\'re covered with our comprehensive insurance packages and secure virtual cards.',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = (prev + 1) % slides.length;
        scrollToSlide(nextSlide);
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const scrollToSlide = (slideIndex) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: slideIndex * width,
        animated: true,
      });
    }
  };

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
      
      // Fade animation when slide changes
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.7,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    scrollToSlide(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Slideshow */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.backgroundSlideshow}
        decelerationRate="fast"
        bounces={false}
      >
        {slides.map((slide, index) => (
          <ImageBackground
            key={slide.id}
            source={slide.image}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {/* Dark Overlay for better text readability */}
            <LinearGradient
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.overlay}
            />
          </ImageBackground>
        ))}
      </ScrollView>

      {/* Fixed Content Overlay */}
      <View style={styles.contentOverlay}>
        
        {/* Main Content Area */}
        <View style={styles.titleContainer}>
          <Animated.View style={[styles.textContent, { opacity: fadeAnim }]}>
            <Text style={styles.mainTitle}>{slides[currentSlide].title}</Text>
            <Text style={styles.subtitle}>{slides[currentSlide].subtitle}</Text>
          </Animated.View>
        </View>
        
        {/* Navigation Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, dotIndex) => (
            <TouchableOpacity
              key={dotIndex}
              style={[
                styles.dot,
                currentSlide === dotIndex ? styles.dotActive : styles.dotInactive
              ]}
              onPress={() => goToSlide(dotIndex)}
              activeOpacity={0.8}
            />
          ))}
        </View>
        
        {/* Fixed Bottom Buttons */}
        <View style={styles.buttonContainer}>
          
          {/* Primary CTA Button */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          {/* Secondary Login Link */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundSlideshow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContent: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 44,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    opacity: 0.9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  dotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.9,
  },
  loginLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default OnboardingScreen;