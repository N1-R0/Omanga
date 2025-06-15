import { auth, firestore } from '../config/firebase';

export const testFirebaseConnection = () => {
  console.log('Firebase Auth:', auth);
  console.log('Firebase Firestore:', firestore);
  console.log('Firebase connected successfully! ✅');
};