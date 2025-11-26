export interface CustomRatingOverride {
    /**
     * Notion 데이터베이스 아이템 ID (우선 적용)
     */
    id?: string;
    /**
     * 가게 이름 (공백/대소문자 무시하고 비교)
     */
    name?: string;
    /**
     * 직접 관리할 평점 (0~5)
     */
    rating: number;
}

/**
 * 자체 관리 평점 목록
 * - id가 있으면 해당 항목에 우선 적용
 * - name만 있다면 공백 제거 + 소문자로 비교하여 적용
 * 예시)
 * {
 *   id: '1234abcd-...',
 *   rating: 4.8
 * }
 * {
 *   name: '맛있는식당',
 *   rating: 4.5
 * }
 */
export const CUSTOM_PLACE_RATINGS: CustomRatingOverride[] = [
    // { id: 'notion-item-id', rating: 4.7 },
    // { name: '가게이름', rating: 4.3 },
];

