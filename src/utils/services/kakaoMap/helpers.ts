/**
 * KakaoMap 유틸리티 함수들
 * HTML 요소 생성 등
 */

/**
 * 커스텀 오버레이 HTML 생성 (버튼)
 */
export function createOverlayContent(placeName: string): HTMLElement {
    const container = document.createElement('button');
    container.className = 'overlay-container';
    container.type = 'button';
    container.textContent = placeName;
    container.setAttribute('aria-label', `${placeName} 상세페이지로 이동`);
    return container;
}

/**
 * 회사 인포윈도우 HTML 생성
 */
export function createCompanyInfoContent(): string {
    return '<div style="padding:10px;font-size:14px;font-weight:700;white-space:nowrap;">🏢 컨센트릭스</div>';
}
