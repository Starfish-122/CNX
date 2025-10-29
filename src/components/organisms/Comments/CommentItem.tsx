'use client';

import { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/utils/services/firebase';
import { Button, Input, Textarea } from '@/components/atoms';

interface CommentItemProps {
    id: string;
    author: string;
    date: string;
    content: string;
    placeName: string;
    password: string;
    onDelete?: () => void;
    onUpdate?: () => void;
}

export default function CommentItem({
    id,
    author,
    date,
    content,
    placeName,
    password: storedPassword,
    onDelete,
    onUpdate,
}: CommentItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [passwordInput, setPasswordInput] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState<'edit' | 'delete' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleVerifyPassword = (action: 'edit' | 'delete') => {
        // 비밀번호가 저장되지 않은 경우 (기존 댓글)
        if (!storedPassword || storedPassword === '') {
            setError('수정/삭제할 수 없는 댓글입니다. 관리자에게 문의하세요.');
            return;
        }

        if (passwordInput.trim() === String(storedPassword).trim()) {
            setError(null);
            setPasswordInput('');
            setShowPasswordModal(null);

            if (action === 'edit') {
                setIsEditing(true);
            } else {
                handleDelete();
            }
        } else {
            setError('비밀번호가 일치하지 않습니다.');
        }
    };

    const handleDelete = async () => {
        if (!db) {
            setError('Firebase 연결 오류');
            return;
        }

        try {
            setLoading(true);
            const commentRef = doc(db, 'places', placeName, 'comments', id);
            await deleteDoc(commentRef);
            onDelete?.();
        } catch (err) {
            console.error('댓글 삭제 중 오류:', err);
            setError('댓글 삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!db) {
            setError('Firebase 연결 오류');
            return;
        }

        if (!editContent.trim()) {
            setError('댓글 내용을 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const commentRef = doc(db, 'places', placeName, 'comments', id);
            await updateDoc(commentRef, {
                content: editContent.trim(),
            });
            setIsEditing(false);
            onUpdate?.();
        } catch (err) {
            console.error('댓글 수정 중 오류:', err);
            setError('댓글 수정에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditContent(content);
        setError(null);
    };

    const handleOpenPasswordModal = (action: 'edit' | 'delete') => {
        setShowPasswordModal(action);
        setPasswordInput('');
        setError(null);
    };

    const handleClosePasswordModal = () => {
        setShowPasswordModal(null);
        setPasswordInput('');
        setError(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent, action: 'edit' | 'delete') => {
        if (e.key === 'Enter') {
            handleVerifyPassword(action);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-4 p-5 bg-gray-100 rounded-xl relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <div className="flex flex-col gap-1">
                            <div className="text-sm font-medium">{author}</div>
                            <div className="text-xs text-gray-500">{date}</div>
                        </div>
                    </div>

                    {!isEditing && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleOpenPasswordModal('edit')}
                                className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1"
                                aria-label="댓글 수정"
                            >
                                수정
                            </button>
                            <button
                                onClick={() => handleOpenPasswordModal('delete')}
                                className="text-xs text-red-600 hover:text-red-800 px-2 py-1"
                                aria-label="댓글 삭제"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="flex flex-col gap-4">
                        <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            disabled={loading}
                            rows={4}
                            aria-label="댓글 수정"
                            size="full"
                            className="border-gray-300 bg-white text-sm"
                        />
                        {error && <div className="text-xs text-red-600">{error}</div>}
                        <div className="flex gap-2">
                            <Button
                                color="primary"
                                onClick={handleUpdate}
                                disabled={loading}
                                aria-label="수정 완료"
                            >
                                {loading ? '저장 중...' : '저장'}
                            </Button>
                            <Button
                                onClick={handleCancelEdit}
                                disabled={loading}
                                aria-label="수정 취소"
                            >
                                취소
                            </Button>
                        </div>
                    </div>
                ) : showPasswordModal === null ? (
                    <div className="text-sm px-2">{content}</div>
                ) : (
                    <></>
                )}
                {/* 비밀번호 확인 모달 */}
                {showPasswordModal && (
                    <div className="" onClick={handleClosePasswordModal}>
                        <div
                            className="bg-white rounded-xl p-4 w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-medium mb-4">비밀번호 확인</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                {showPasswordModal === 'edit' ? '댓글을 수정' : '댓글을 삭제'}하려면
                                비밀번호를 입력해주세요.
                            </p>
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, showPasswordModal)}
                                aria-label="비밀번호 입력"
                                autoFocus
                            />
                            {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
                            <div className="flex gap-2 mt-4">
                                <Button
                                    color="primary"
                                    onClick={() => handleVerifyPassword(showPasswordModal)}
                                    aria-label="확인"
                                >
                                    확인
                                </Button>
                                <Button onClick={handleClosePasswordModal} aria-label="취소">
                                    취소
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
