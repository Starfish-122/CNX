'use client';

import { useState } from 'react';
import { navLinks as defaultNavLinks, NavLink } from './config';

/**
 * 네비게이션 링크를 제공하는 커스텀 훅
 * 간단하게 config의 navLinks를 반환
 * @returns {NavLink[]} - 네비게이션 링크 객체 배열
 */
export function useAppRoutes(): NavLink[] {
    // config.ts 기본 네비게이션 링크
    const [navLinks] = useState<NavLink[]>(defaultNavLinks);
    return navLinks;
}

export default useAppRoutes;