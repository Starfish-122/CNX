// 애플리케이션 네비게이션 및 사이드바 구성
import { componentData } from '@/data/componentData';

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
 * 컴포넌트를 카테고리별 자동 분류
 */
const categorizeComponents = () => {
    const atoms: SidebarItem[] = [];
    const molecules: SidebarItem[] = [];

    Object.entries(componentData).forEach(([key, data]) => {
        const item = { name: data.componentName, path: `/guide/${key}` };

        // 컴포넌트 이름으로 카테고리 분류
        if (
            [
                'Button',
                'ButtonLink',
                'Input',
                'Textarea',
                'Text',
                'Title',
                'Icon',
                'Tag',
                'TextExample',
            ].includes(data.componentName)
        ) {
            atoms.push(item);
        } else {
            molecules.push(item);
        }
    });

    return { atoms, molecules };
};

const { atoms, molecules } = categorizeComponents();

/**
 * 사이드바 카테고리 및 아이템 정의
 */
export const sidebarCategories: SidebarCategory[] = [
    {
        id: 'atoms',
        name: '기본 컴포넌트',
        items: atoms,
    },
    {
        id: 'molecules',
        name: '모듈 컴포넌트',
        items: molecules,
    },
];
