/**
 * Firebase 서비스
 * Firestore 데이터베이스 연동
 */

export { db, app } from './config';
export { getLikeCount, checkUserLiked, addLike, removeLike, toggleLike } from './likes';
