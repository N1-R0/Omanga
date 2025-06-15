import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('NGN');
  const [balance] = useState(150000); // Mock balance

  // Mock user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    selectedPackages: ['card', 'insurance'], // From previous screen
  };

  // Currency conversion rates (mock data)
  const exchangeRates = {
    USD: { rate: 0.0013, symbol: '$' },
    EUR: { rate: 0.0012, symbol: '€' },
    GBP: { rate: 0.0010, symbol: '£' },
    NGN: { rate: 1, symbol: '₦' },
  };

  const getConvertedBalance = () => {
    const rate = exchangeRates[selectedCurrency].rate;
    const symbol = exchangeRates[selectedCurrency].symbol;
    const converted = (balance * rate).toFixed(2);
    return `${symbol}${parseFloat(converted).toLocaleString()}`;
  };

  const handleCurrencyConversion = () => {
    Alert.alert(
      'FuzePay Integration',
      'This will open FuzePay\'s currency conversion service. Integration coming next!',
      [{ text: 'OK' }]
    );
  };

  const handleVirtualCard = () => {
    Alert.alert(
      'FuzePay Integration',
      'This will open FuzePay\'s virtual card service. Integration coming next!',
      [{ text: 'OK' }]
    );
  };

  const handleInsurance = () => {
    Alert.alert(
      'Insurance Service',
      'Insurance package management coming soon!',
      [{ text: 'OK' }]
    );
  };

  const quickActions = [
    {
      id: 'convert',
      title: 'Currency Exchange',
      subtitle: 'Convert your money',
      icon: 'swap-horizontal',
      color: '#4CAF50',
      onPress: handleCurrencyConversion,
    },
    {
      id: 'card',
      title: 'Virtual Card',
      subtitle: 'Temporary card',
      icon: 'card',
      color: '#2196F3',
      onPress: handleVirtualCard,
    },
    {
      id: 'insurance',
      title: 'Travel Insurance',
      subtitle: 'Stay protected',
      icon: 'shield-checkmark',
      color: '#FF9800',
      onPress: handleInsurance,
    },
    {
      id: 'support',
      title: 'Support',
      subtitle: 'Get help',
      icon: 'help-circle',
      color: '#9C27B0',
      onPress: () => Alert.alert('Support', 'Contact support feature coming soon!'),
    },
  ];

  const recentTransactions = [
    { id: 1, type: 'Currency Exchange', amount: '-$250', date: 'Today', icon: 'swap-horizontal' },
    { id: 2, type: 'Card Payment', amount: '-₦15,000', date: 'Yesterday', icon: 'card' },
    { id: 3, type: 'Insurance Premium', amount: '-$45', date: '2 days ago', icon: 'shield' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{userData.name}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}
            >
              <Ionicons name="person-circle-outline" size={32} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceSection}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.balanceCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.balanceContent}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>{getConvertedBalance()}</Text>
              
              {/* Currency Selector */}
              <View style={styles.currencySelector}>
                {Object.keys(exchangeRates).map((currency) => (
                  <TouchableOpacity
                    key={currency}
                    style={[
                      styles.currencyButton,
                      selectedCurrency === currency && styles.currencyButtonActive
                    ]}
                    onPress={() => setSelectedCurrency(currency)}
                  >
                    <Text style={[
                      styles.currencyText,
                      selectedCurrency === currency && styles.currencyTextActive
                    ]}>
                      {currency}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FuzePay Integration Section */}
        <View style={styles.integrationSection}>
          <Text style={styles.sectionTitle}>Financial Services</Text>
          
          <TouchableOpacity 
            style={styles.fuzePayCard}
            onPress={handleCurrencyConversion}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={styles.fuzePayGradient}
            >
              <View style={styles.fuzePayContent}>
                <View style={styles.fuzePayHeader}>
                  <Text style={styles.fuzePayTitle}>Powered by FuzePay</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </View>
                <Text style={styles.fuzePayDescription}>
                  Access currency exchange, virtual cards, and more financial services
                </Text>
                <View style={styles.fuzePayFeatures}>
                  <Text style={styles.featureText}>• Currency Exchange</Text>
                  <Text style={styles.featureText}>• Virtual Cards</Text>
                  <Text style={styles.featureText}>• Secure Payments</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => Alert.alert('History', 'Full transaction history coming soon!')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Ionicons name={transaction.icon} size={20} color="#666" />
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  balanceSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  balanceCard: {
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
  balanceContent: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  currencySelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
  },
  currencyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 2,
  },
  currencyButtonActive: {
    backgroundColor: '#fff',
  },
  currencyText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  currencyTextActive: {
    color: '#667eea',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  integrationSection: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  fuzePayCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  fuzePayGradient: {
    padding: 20,
  },
  fuzePayContent: {
    flex: 1,
  },
  fuzePayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fuzePayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  fuzePayDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    lineHeight: 20,
  },
  fuzePayFeatures: {
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  transactionsSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  transactionsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default DashboardScreen;