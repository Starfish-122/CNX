/**
 * Firebase 관련 타입 정의
 */

import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

// ============ Firebase Config ============
export interface FirebaseConfig {
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
}

// ============ Firebase Instance ============
export interface FirebaseInstance {
    app: FirebaseApp | null;
    db: Firestore | null;
}

// ============ Comment Types ============
export interface FirestoreComment {
    id: string;
    author: string;
    content: string;
    password: string;
    createdAt: Date | null;
    placeName: string;
}

export interface CommentFormData {
    author: string;
    password: string;
    content: string;
}
