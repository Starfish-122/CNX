import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3i8StWWvcYNd3pp1nf1sX5QPLWxjLZQk",
    authDomain: "cnx-place.firebaseapp.com",
    projectId: "cnx-place",
    storageBucket: "cnx-place.firebasestorage.app",
    messagingSenderId: "188111575423",
    appId: "1:188111575423:web:4de8ee4055be285de6224a"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db: Firestore = getFirestore(app);

export { db };

