/**
 * Comments 컴포넌트 타입 정의
 */

export interface Comment {
    id: string;
    author: string;
    date: string;
    content: string;
    password: string;
    createdAt?: Date;
}

export interface CommentFormProps {
    placeName: string;
}

export interface CommentItemProps {
    id: string;
    author: string;
    date: string;
    content: string;
    placeName: string;
    password: string;
    onDelete?: () => void;
    onUpdate?: () => void;
}

export interface CommentListProps {
    placeName: string;
}
