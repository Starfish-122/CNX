// 애플리케이션 네비게이션 및 사이드바 구성

/**
 * 네비게이션 링크 인터페이스
 */
export interface NavLink {
    href: string;
    label: string;
}

/**
 * 사이드바 아이템 인터페이스
 */
export interface SidebarItem {
    name: string;
    path: string;
    icon?: string;
}

/**
 * 사이드바 카테고리 인터페이스
 */
export interface SidebarCategory {
    id: string;
    name: string;
    items: SidebarItem[];
}

/**
 * 메인 네비게이션 링크
 */
export const navLinks: NavLink[] = [
    { href: '/guide', label: '가이드' },
    { href: '/components', label: '컴포넌트' },
];

/**
 * 사이드바 카테고리 및 아이템 정의
 */
export const sidebarCategories: SidebarCategory[] = [
    {
        id: 'atoms',
        name: '기본 컴포넌트',
        items: [
            { name: 'Icon', path: '/guide/icon' },
            { name: 'Title', path: '/guide/title' },
            { name: 'Text', path: '/guide/text' },
            { name: 'Tag', path: '/guide/tag' },
            { name: 'Input', path: '/guide/input' },
            { name: 'Textarea', path: '/guide/textarea' },
            { name: 'Button', path: '/guide/button' },
        ],
    },
    {
        id: 'molecule',
        name: '모듈 컴포넌트',
        items: [
            { name: 'StarRating', path: '/guide/star-rating' },
            { name: 'Card', path: '/guide/card' },
        ],
    },
];
