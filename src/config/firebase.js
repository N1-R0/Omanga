// src/config/firebase.js
import 'react-native-get-random-values'; // Add this line at the top

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBASRl9vqE_uaW0uarQqKe8m07RTINM4IE",
  authDomain: "omanga-f33ab.firebaseapp.com",
  projectId: "omanga-f33ab",
  storageBucket: "omanga-f33ab.firebasestorage.app",
  messagingSenderId: "1038603732987",
  appId: "1:1038603732987:web:99bba9fc029b14bbacad5e",
  measurementId: "G-379F0HQJ70"
};

// Initialize Firebase
let app;
let auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  // Initialize Auth with persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

export { auth };
export const firestore = getFirestore(app);

export const COLLECTIONS = {
  USERS: 'users',
  PACKAGES: 'packages',
  SESSIONS: 'sessions',
};

export default app;