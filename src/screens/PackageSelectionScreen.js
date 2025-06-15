import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const PackageSelectionScreen = ({ navigation }) => {
  const [selectedPackages, setSelectedPackages] = useState([]);

  const packages = [
    {
      id: 'card',
      title: 'Card Package',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      icon: 'card-outline',
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 'insurance',
      title: 'Insurance Package',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      icon: 'shield-checkmark-outline',
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#7EDDD6'],
    }
  ];

  const togglePackage = (packageId) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId);
      } else {
        return [...prev, packageId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedPackages.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one package to continue.');
      return;
    }

    Alert.alert(
      'Great Choice!',
      `You've selected: ${selectedPackages.map(id => 
        packages.find(pkg => pkg.id === id)?.title
      ).join(', ')}`,
      [
        { 
          text: 'Continue to Dashboard', 
          onPress: () => navigation.navigate('Dashboard')
        }
      ]
    );
  };

  const isPackageSelected = (packageId) => selectedPackages.includes(packageId);

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
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Package Selection Container */}
          <View style={styles.selectionContainer}>
            <View style={styles.selectionCard}>
              
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Select Package</Text>
                <Text style={styles.subtitle}>Kindly select at least one package</Text>
              </View>
              
              {/* Package Options */}
              <View style={styles.packagesContainer}>
                {packages.map((pkg, index) => {
                  const selected = isPackageSelected(pkg.id);
                  
                  return (
                    <TouchableOpacity
                      key={pkg.id}
                      style={[
                        styles.packageCard,
                        selected && styles.packageCardSelected
                      ]}
                      onPress={() => togglePackage(pkg.id)}
                      activeOpacity={0.8}
                    >
                      {/* Selection Indicator */}
                      <View style={styles.selectionIndicator}>
                        <View style={[
                          styles.radioButton,
                          selected && styles.radioButtonSelected
                        ]}>
                          {selected && <View style={styles.radioButtonInner} />}
                        </View>
                      </View>
                      
                      {/* Package Content */}
                      <View style={styles.packageContent}>
                        
                        {/* Icon with Gradient Background */}
                        <View style={styles.iconContainer}>
                          <LinearGradient
                            colors={pkg.gradient}
                            style={styles.iconBackground}
                          >
                            <Ionicons 
                              name={pkg.icon} 
                              size={32} 
                              color="#fff" 
                            />
                          </LinearGradient>
                        </View>
                        
                        {/* Package Info */}
                        <View style={styles.packageInfo}>
                          <Text style={styles.packageTitle}>{pkg.title}</Text>
                          <Text style={styles.packageDescription}>
                            {pkg.description}
                          </Text>
                        </View>
                        
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              
              {/* Page Indicator */}
              <View style={styles.pageIndicator}>
                <Text style={styles.pageText}>{selectedPackages.length} / 2</Text>
              </View>
              
              {/* Continue Button */}
              <TouchableOpacity 
                style={[
                  styles.continueButton,
                  selectedPackages.length === 0 ? styles.continueButtonDisabled : styles.continueButtonActive
                ]}
                onPress={handleContinue}
                activeOpacity={0.8}
                disabled={selectedPackages.length === 0}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  selectionContainer: {
    paddingHorizontal: 24,
  },
  selectionCard: {
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
    textAlign: 'center',
  },
  packagesContainer: {
    marginBottom: 32,
  },
  packageCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  packageCardSelected: {
    backgroundColor: '#fff',
    borderColor: '#007bff',
    shadowOpacity: 0.15,
    elevation: 6,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    borderColor: '#007bff',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007bff',
  },
  packageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  packageInfo: {
    flex: 1,
    paddingRight: 32, // Space for radio button
  },
  packageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  packageDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pageIndicator: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pageText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  continueButton: {
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
  continueButtonActive: {
    backgroundColor: '#000',
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PackageSelectionScreen;