/**
 * Firebase 좋아요 관리 서비스
 */

import {
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    increment,
    serverTimestamp,
    runTransaction,
} from 'firebase/firestore';
import { db } from './config';
import type { PlaceData, LikedUser } from '@/types/firebase';

/**
 * 고유 사용자 ID 생성 또는 가져오기
 */
const getUserId = (): string => {
    if (typeof window === 'undefined') return '';

    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', userId);
    }
    return userId;
};

/**
 * 장소의 좋아요 카운트 가져오기
 */
export const getLikeCount = async (placeName: string): Promise<number> => {
    if (!db) {
        console.warn('Firebase 미연결 - 좋아요 카운트 0 반환');
        return 0;
    }

    try {
        const placeRef = doc(db, 'places', placeName);
        const placeSnap = await getDoc(placeRef);

        if (placeSnap.exists()) {
            const data = placeSnap.data() as PlaceData;
            return data.likeCount || 0;
        }
        return 0;
    } catch (error: unknown) {
        // Firebase 에러 타입 체크
        if (error instanceof Error) {
            if (error.message.includes('offline')) {
                console.warn('Firebase 오프라인 상태 - 좋아요 카운트 0 반환');
            } else if (error.message.includes('permission')) {
                console.error('❌ Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.');
            } else {
                console.error('좋아요 카운트 조회 실패:', error);
            }
        }
        return 0;
    }
};

/**
 * 사용자가 해당 장소를 좋아요 했는지 확인
 */
export const checkUserLiked = async (placeName: string): Promise<boolean> => {
    if (!db) {
        console.warn('Firebase 미연결 - 좋아요 상태 false 반환');
        return false;
    }

    try {
        const userId = getUserId();
        const likedUserRef = doc(db, 'places', placeName, 'likedUsers', userId);
        const likedUserSnap = await getDoc(likedUserRef);

        return likedUserSnap.exists();
    } catch (error: unknown) {
        // Firebase 에러 타입 체크
        if (error instanceof Error) {
            if (error.message.includes('offline')) {
                console.warn('Firebase 오프라인 상태 - 좋아요 상태 false 반환');
            } else if (error.message.includes('permission')) {
                console.error('❌ Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.');
            } else {
                console.error('좋아요 상태 확인 실패:', error);
            }
        }
        return false;
    }
};

/**
 * 좋아요 추가
 */
export const addLike = async (placeName: string): Promise<boolean> => {
    if (!db) {
        console.error('Firebase 연결 오류');
        return false;
    }

    try {
        const userId = getUserId();
        const placeRef = doc(db, 'places', placeName);
        const likedUserRef = doc(db, 'places', placeName, 'likedUsers', userId);

        // Transaction으로 동시성 문제 해결
        await runTransaction(db, async (transaction) => {
            const placeSnap = await transaction.get(placeRef);

            // 장소 문서가 없으면 생성
            if (!placeSnap.exists()) {
                transaction.set(placeRef, {
                    likeCount: 1,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                });
            } else {
                // 좋아요 카운트 증가
                transaction.update(placeRef, {
                    likeCount: increment(1),
                    updatedAt: serverTimestamp(),
                });
            }

            // 좋아요 한 사용자 기록
            transaction.set(likedUserRef, {
                userId,
                likedAt: serverTimestamp(),
            });
        });

        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes('offline')) {
                console.warn('Firebase 오프라인 상태 - 좋아요 추가 실패');
            } else if (error.message.includes('permission')) {
                console.error('❌ Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.');
            } else {
                console.error('좋아요 추가 실패:', error);
            }
        }
        return false;
    }
};

/**
 * 좋아요 제거
 */
export const removeLike = async (placeName: string): Promise<boolean> => {
    if (!db) {
        console.error('Firebase 연결 오류');
        return false;
    }

    try {
        const userId = getUserId();
        const placeRef = doc(db, 'places', placeName);
        const likedUserRef = doc(db, 'places', placeName, 'likedUsers', userId);

        // Transaction으로 동시성 문제 해결
        await runTransaction(db, async (transaction) => {
            const placeSnap = await transaction.get(placeRef);

            if (placeSnap.exists()) {
                // 좋아요 카운트 감소 (0 이하로 가지 않도록)
                const currentLikeCount = (placeSnap.data() as PlaceData).likeCount || 0;
                if (currentLikeCount > 0) {
                    transaction.update(placeRef, {
                        likeCount: increment(-1),
                        updatedAt: serverTimestamp(),
                    });
                }
            }

            // 좋아요 한 사용자 기록 삭제
            transaction.delete(likedUserRef);
        });

        return true;
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes('offline')) {
                console.warn('Firebase 오프라인 상태 - 좋아요 제거 실패');
            } else if (error.message.includes('permission')) {
                console.error('❌ Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.');
            } else {
                console.error('좋아요 제거 실패:', error);
            }
        }
        return false;
    }
};

/**
 * 좋아요 토글
 * @returns { success: boolean, isLiked: boolean, likeCount: number, error?: string }
 */
export const toggleLike = async (
    placeName: string
): Promise<{ success: boolean; isLiked: boolean; likeCount: number; error?: string }> => {
    if (!db) {
        return {
            success: false,
            isLiked: false,
            likeCount: 0,
            error: 'Firebase가 연결되지 않았습니다.',
        };
    }

    try {
        const isLiked = await checkUserLiked(placeName);
        let success = false;

        if (isLiked) {
            success = await removeLike(placeName);
        } else {
            success = await addLike(placeName);
        }

        const likeCount = await getLikeCount(placeName);

        // 에러 메시지 결정
        let errorMessage: string | undefined;
        if (!success) {
            errorMessage = 'Firebase 연결 오류가 발생했습니다.';
        }

        return {
            success,
            isLiked: success ? !isLiked : isLiked,
            likeCount,
            error: errorMessage,
        };
    } catch (error: unknown) {
        console.error('좋아요 토글 실패:', error);
        const currentLikeCount = await getLikeCount(placeName);
        const currentIsLiked = await checkUserLiked(placeName);

        let errorMessage = '알 수 없는 오류가 발생했습니다.';
        if (error instanceof Error) {
            if (error.message.includes('permission')) {
                errorMessage = 'Firebase 권한이 없습니다. 관리자에게 문의하세요.';
            } else if (error.message.includes('offline')) {
                errorMessage = 'Firebase 오프라인 상태입니다.';
            } else {
                errorMessage = error.message;
            }
        }

        return {
            success: false,
            isLiked: currentIsLiked,
            likeCount: currentLikeCount,
            error: errorMessage,
        };
    }
};

