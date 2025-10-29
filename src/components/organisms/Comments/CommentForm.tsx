'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils/services/firebase';
import { Button, Input, Textarea } from '@/components/atoms';

interface FormData {
    author: string;
    password: string;
    content: string;
}

export default function CommentForm({ placeName }: { placeName: string }) {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        password: '',
        content: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
        null
    );

    const handleInputChange =
        (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Firebase 연결 확인
        if (!db) {
            setMessage({ type: 'error', text: 'Firebase 연결 오류: 환경변수를 확인해주세요.' });
            return;
        }

        // 유효성 검사
        if (!formData.author.trim()) {
            setMessage({ type: 'error', text: '작성자 이름을 입력해주세요.' });
            return;
        }

        if (!formData.password.trim()) {
            setMessage({ type: 'error', text: '비밀번호를 입력해주세요.' });
            return;
        }

        if (!formData.content.trim()) {
            setMessage({ type: 'error', text: '댓글 내용을 입력해주세요.' });
            return;
        }

        try {
            setLoading(true);
            setMessage(null);

            // Firestore에 댓글 추가 (서브컬렉션 방식)
            const commentsRef = collection(db, 'places', placeName, 'comments');
            await addDoc(commentsRef, {
                author: formData.author.trim(),
                password: formData.password, // 실제 프로덕션에서는 암호화 필요
                content: formData.content.trim(),
                createdAt: serverTimestamp(),
            });

            // 성공 메시지 및 폼 초기화
            setMessage({ type: 'success', text: '댓글이 성공적으로 작성되었습니다!' });
            setFormData({
                author: '',
                password: '',
                content: '',
            });

            // 페이지 새로고침으로 댓글 목록 업데이트
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error('댓글 작성 중 오류 발생:', error);

            // Firebase 에러 메시지 파싱
            let errorMessage = '댓글 작성에 실패했습니다. 다시 시도해주세요.';
            if (error instanceof Error) {
                if (error.message.includes('permission')) {
                    errorMessage = 'Firebase 권한 오류: Firestore 보안 규칙을 확인해주세요.';
                } else if (error.message.includes('network')) {
                    errorMessage = '네트워크 오류: 인터넷 연결을 확인해주세요.';
                } else {
                    errorMessage = `오류: ${error.message}`;
                }
            }

            setMessage({ type: 'error', text: errorMessage });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-gray-100 rounded-xl p-4">
            <div className="flex gap-3">
                <div className="flex-1">
                    <Input
                        id="author"
                        placeholder="작성자"
                        value={formData.author}
                        onChange={handleInputChange('author')}
                        disabled={loading}
                        aria-label="작성자 이름"
                        size="full"
                        className="border-none bg-white rounded-lg text-sm"
                    />
                </div>
                <div className="flex-1">
                    <Input
                        id="password"
                        type="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        disabled={loading}
                        aria-label="비밀번호"
                        size="full"
                        className="border-none bg-white rounded-lg text-sm"
                    />
                </div>
            </div>

            <Textarea
                id="content"
                placeholder="댓글을 입력해주세요. (Ctrl + Enter로 작성)"
                value={formData.content}
                onChange={handleInputChange('content')}
                onKeyDown={handleKeyDown}
                disabled={loading}
                aria-label="댓글 내용"
                rows={4}
                size="full"
                className="border-none bg-white rounded-lg text-sm"
            />

            {message && (
                <div
                    className={`text-sm p-2 rounded ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                    role="alert"
                >
                    {message.text}
                </div>
            )}

            <Button color="primary" type="submit" disabled={loading} aria-label="댓글 작성하기">
                {loading ? '작성 중...' : '댓글 작성'}
            </Button>
        </form>
    );
}
