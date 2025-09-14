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
        id: 'base',
        name: '기본 컴포넌트',
        items: [
            { name: 'Icon', path: '/guide/icon', icon: 'format_shapes' },
            { name: 'Title', path: '/guide/title', icon: 'title' },
            { name: 'Text', path: '/guide/text', icon: 'text_fields' },
            { name: 'Tag', path: '/guide/tag', icon: 'label' },
            { name: 'StarRating', path: '/guide/star-rating', icon: 'star_rate' },
        ],
    },
    {
        id: 'interactive',
        name: '인터랙션 컴포넌트',
        items: [
            { name: 'Input', path: '/guide/input', icon: 'input' },
            { name: 'Button', path: '/guide/button', icon: 'buttons_alt' },
        ],
    },
];