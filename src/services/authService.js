// src/services/authService.js
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc,
  query,
  where,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { auth, firestore, COLLECTIONS } from '../config/firebase';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.currentUserProfile = null;
    
    // Listen to auth state changes
    onAuthStateChanged(auth, this.onAuthStateChanged.bind(this));
  }

  async onAuthStateChanged(user) {
    this.currentUser = user;
    
    if (user) {
      try {
        this.currentUserProfile = await this.getUserDocument(user.uid);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    } else {
      this.currentUserProfile = null;
    }
  }

  // Sign up with email and password
  async signUp({ email, password, phone, name }) {
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name if provided
      if (name) {
        await updateProfile(user, {
          displayName: name,
        });
      }

      // Create user document in Firestore
      const userProfile = await this.createUserDocument(user, {
        phone,
        name,
      });

      // Send email verification
      await sendEmailVerification(user);

      return {
        success: true,
        user: userProfile,
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Login with email and password
  async login({ email, password, rememberMe = false }) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userProfile = await this.getUserDocument(user.uid);

      // Log session
      await this.logUserSession(user);

      return {
        success: true,
        user: userProfile,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Logout
  async logout() {
    try {
      if (this.currentUser) {
        await this.logUserSessionEnd(this.currentUser.uid);
      }

      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: this.getErrorMessage(error.code),
      };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Get current user profile
  getCurrentUserProfile() {
    return this.currentUserProfile;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser;
  }

  // Create user document in Firestore
  async createUserDocument(user, additionalData = {}) {
    if (!user) throw new Error('User object is required');

    const userRef = doc(firestore, COLLECTIONS.USERS, user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const userData = {
        uid: user.uid,
        email: user.email || '',
        phone: user.phoneNumber || '',
        name: user.displayName || '',
        profile: {
          profilePicture: user.photoURL || null,
          dateOfBirth: null,
          address: null,
        },
        preferences: {
          selectedPackages: [],
          defaultCurrency: 'NGN',
        },
        verification: {
          emailVerified: user.emailVerified,
          phoneVerified: !!user.phoneNumber,
          kycStatus: 'not_started',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        ...additionalData,
      };

      try {
        await setDoc(userRef, userData);
        return userData;
      } catch (error) {
        console.error('Error creating user document:', error);
        throw error;
      }
    }

    return snapshot.data();
  }

  // Get user document from Firestore
  async getUserDocument(uid) {
    try {
      const userRef = doc(firestore, COLLECTIONS.USERS, uid);
      const snapshot = await getDoc(userRef);
      
      if (snapshot.exists()) {
        return snapshot.data();
      }
      return null;
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error;
    }
  }

  // Update user document
  async updateUserDocument(uid, updates) {
    try {
      const userRef = doc(firestore, COLLECTIONS.USERS, uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating user document:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      if (!this.currentUser) {
        throw new Error('No authenticated user');
      }

      await this.updateUserDocument(this.currentUser.uid, updates);
      
      // Refresh current user profile
      this.currentUserProfile = await this.getUserDocument(this.currentUser.uid);

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Log user session
  async logUserSession(user) {
    try {
      const sessionData = {
        userId: user.uid,
        deviceInfo: {
          platform: 'expo',
          deviceId: 'expo-device-id', // You can get actual device ID
          appVersion: '1.0.0',
        },
        loginAt: new Date(),
        isActive: true,
      };

      await addDoc(collection(firestore, COLLECTIONS.SESSIONS), sessionData);
    } catch (error) {
      console.error('Error logging session:', error);
    }
  }

  // Log session end
  async logUserSessionEnd(userId) {
    try {
      const sessionsRef = collection(firestore, COLLECTIONS.SESSIONS);
      const q = query(
        sessionsRef,
        where('userId', '==', userId),
        where('isActive', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(firestore);
      
      querySnapshot.forEach((docSnapshot) => {
        batch.update(docSnapshot.ref, {
          logoutAt: new Date(),
          isActive: false,
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error logging session end:', error);
    }
  }

  // Convert Firebase error codes to user-friendly messages
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/invalid-credential': 'Invalid login credentials. Please try again.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled.',
    };

    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;