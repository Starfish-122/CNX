'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

interface Comment {
    id: string;
    author: string;
    date: string;
    content: string;
    password: string;
    createdAt?: Date;
}

export default function CommentList({ placeName }: { placeName: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleFetchComments = async () => {
            try {
                setLoading(true);
                setError(null);

                // Firestore의 'places/{placeName}/comments' 서브컬렉션에서 데이터 가져오기
                const commentsRef = collection(db, 'places', placeName, 'comments');
                const q = query(commentsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedComments: Comment[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('Firebase 댓글 데이터:', data);
                    console.log('비밀번호 필드:', data.password);
                    fetchedComments.push({
                        id: doc.id,
                        author: data.author || '익명',
                        date: data.createdAt?.toDate?.()?.toLocaleDateString('ko-KR') || data.date || '날짜 정보 없음',
                        content: data.content || '',
                        password: data.password || '',
                        createdAt: data.createdAt?.toDate?.() || null,
                    });
                });

                setComments(fetchedComments);
            } catch (err) {
                console.error('댓글을 불러오는 중 오류 발생:', err);
                
                // 더 자세한 에러 메시지
                let errorMessage = '댓글을 불러오는데 실패했습니다.';
                if (err instanceof Error) {
                    if (err.message.includes('index')) {
                        errorMessage = 'Firestore 인덱스를 생성해주세요. 콘솔에서 링크를 확인하세요.';
                    } else if (err.message.includes('permission')) {
                        errorMessage = 'Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.';
                    } else {
                        errorMessage = `오류: ${err.message}`;
                    }
                }
                
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (placeName) {
            handleFetchComments();
        }
    }, [placeName]);

    const handleRefreshComments = () => {
        const handleFetchComments = async () => {
            try {
                const commentsRef = collection(db, 'places', placeName, 'comments');
                const q = query(commentsRef, orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);

                const fetchedComments: Comment[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log('새로고침 - Firebase 댓글 데이터:', data);
                    console.log('새로고침 - 비밀번호 필드:', data.password);
                    fetchedComments.push({
                        id: doc.id,
                        author: data.author || '익명',
                        date: data.createdAt?.toDate?.()?.toLocaleDateString('ko-KR') || data.date || '날짜 정보 없음',
                        content: data.content || '',
                        password: data.password || '',
                        createdAt: data.createdAt?.toDate?.() || null,
                    });
                });

                setComments(fetchedComments);
            } catch (err) {
                console.error('댓글을 불러오는 중 오류 발생:', err);
            }
        };
        
        handleFetchComments();
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-center text-gray-500 p-4">댓글을 불러오는 중...</div>
                <CommentForm placeName={placeName} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col gap-2">
                <div className="text-center text-red-500 p-4">{error}</div>
                <CommentForm placeName={placeName} />
            </div>
        );
    }

    return (
        <div className="comment-list">
            <strong className="block text-xl font-medium mb-4">Comments <span className="text-blue-400 text-md">{comments.length}</span></strong>
            <div className="flex flex-col gap-4">
                {comments.length === 0 ? (
                    <div className="text-center text-gray-500 p-4">아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            id={comment.id}
                            author={comment.author}
                            date={comment.createdAt?.toLocaleDateString('ko-KR') || '날짜 정보 없음'}
                            content={comment.content}
                            placeName={placeName}
                            password={comment.password}
                            onDelete={handleRefreshComments}
                            onUpdate={handleRefreshComments}
                        />
                    ))
                )}
            
                <CommentForm placeName={placeName} />
            </div>
        </div>
    );
}