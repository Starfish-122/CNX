'use client';

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:188111575423:web:dummy', // Optional fallback
};

// Firebase 설정 검증
const validateFirebaseConfig = () => {
    const requiredKeys = ['apiKey', 'authDomain', 'projectId'] as const;
    const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

    if (missingKeys.length > 0) {
        console.error('❌ Firebase 설정 오류: 다음 환경변수가 누락되었습니다:', missingKeys);
        return false;
    }
    return true;
};

// Initialize Firebase (클라이언트 사이드에서만 초기화)
let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// 클라이언트 사이드에서만 초기화
if (typeof window !== 'undefined') {
    try {
        if (validateFirebaseConfig()) {
            app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
            db = getFirestore(app);
            console.log('✅ Firebase 초기화 성공');
        }
    } catch (error) {
        console.error('❌ Firebase 초기화 실패:', error);
    }
}

export { db, app };
