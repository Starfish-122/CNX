import { Icon } from '@/components/atoms';
import Link from 'next/link';

const quickStartSteps = [
    {
        title: '홈에서 카테고리 확인',
        detail: '메인 홈에서 바로 인기 카테고리와 추천 맛집을 확인합니다.',
        action: { label: '홈 살펴보기', href: '/' },
    },
    {
        title: '지도/검색으로 탐색',
        detail: '지도 이동과 필터로 원하는 지역과 조건을 빠르게 찾습니다.',
        action: { label: '지도 열기', href: '/map' },
    },
    {
        title: '상세 모달에서 심층 정보',
        detail: '사진, 주요 정보, 탭별 리뷰와 데이터까지 한 번에 확인합니다.',
        action: { label: '상세 예시', href: '/detail/sample-place' },
    },
    {
        title: '댓글 · 즐겨찾기로 소통',
        detail: '맛집 의견을 남기고 북마크로 나만의 리스트를 구성합니다.',
        action: { label: '커뮤니티 가이드', href: '/guide/comments' },
    },
];

const featureHighlights = [
    {
        title: '지도로 한눈에 탐색',
        description:
            '로딩 없이 줌/드래그가 가능한 카카오 기반 지도와 커스텀 오버레이로 밀집 지역도 깔끔하게 볼 수 있습니다.',
        tip: 'Shift + 마우스 휠로 수직 줌을 빠르게 조절하세요.',
    },
    {
        title: '정교한 필터와 정렬',
        description:
            '거리, 평점, 테마 등 다중 필터를 조합하고 정렬 옵션으로 상황에 맞는 결과를 얻을 수 있습니다.',
        tip: '필터 초기화는 상단 초기화 버튼으로 실행됩니다.',
    },
    {
        title: '실시간 데이터 반영',
        description:
            '휴무일, 리뷰 수, 인기 지표 같은 실시간 정보를 Detail 탭에서 자동으로 업데이트합니다.',
        tip: '오프라인 매장은 지도의 좌측 하단에 있습니다.',
    },
];

const interactionCards = [
    {
        title: '댓글 참여',
        description: '리뷰/팁을 남기면 다른 이용자들에게 바로 공유됩니다.',
        bullets: ['비밀번호 및 수정 기능', '좋아요 기능', '모바일 이모지 입력 최적화'],
    },
    {
        title: '즐겨찾기',
        description: '하트 아이콘으로 저장하면 내 컬렉션에서 빠르게 찾을 수 있습니다.',
        bullets: ['마이페이지 동기화', '순서 재배치 가능', '오프라인/온라인 구분'],
    },
    {
        title: '공유 & 링크',
        description: '상세 모달의 공유 버튼으로 SNS/메신저에 즉시 전달하세요.',
        bullets: ['카카오톡 바로 공유', 'URL 클립보드 복사'],
    },
];

const faqItems = [
    {
        q: '검색 결과가 비어 있어요.',
        a: '필터가 과도하게 적용되었을 수 있습니다. 초기화 버튼을 누르거나 거리를 확장해 보세요.',
    },
    {
        q: '지도에 위치가 잘못 표시돼요.',
        a: '사이트의 하단에 있는 메일 폼을 이용해 주세요. 24시간 내 검수 후 반영됩니다.',
    },
    {
        q: '모바일에서 모달이 닫히지 않아요.',
        a: '우측 상단 닫기 버튼 또는 아래로 스와이프 제스처를 사용하세요. 그래도 안 된다면 브라우저 새로고침을 시도하세요.',
    },
];

export default function UserGuidePage(): React.JSX.Element {
    return (
        <main className="user-guide max-w-3/4 mx-auto mt-13">
            <header className="user-guide__hero">
                <p className="user-guide__eyebrow">Onboarding</p>
                <h1>CNX 이용 가이드</h1>
                <p className="user-guide__lede">
                    지도 검색부터 상세 모달, 커뮤니티 기능까지 한 페이지에서 빠르게 익힐 수 있는
                    사용자 안내서입니다.
                </p>
                <div className="user-guide__hero-actions">
                    {/* <Link href="/map" className="user-guide__button user-guide__button--primary">
                        바로 지도 열기
                    </Link> */}
                    <Link href="/guide" className="user-guide__button user-guide__button--primary">
                        컴포넌트 가이드
                    </Link>
                </div>
                <aside className="user-guide__hero-tip">
                    <strong>Tip</strong>
                    <span>데스크톱은 키보드, 모바일은 제스처 안내가 각각 포함되어 있습니다.</span>
                </aside>
            </header>

            <section className="user-guide__grid mt-4" aria-label="핵심 기능 소개">
                {featureHighlights.map((feature) => (
                    <article key={feature.title} className="user-guide__card">
                        <h2>{feature.title}</h2>
                        <p>{feature.description}</p>
                        <footer>
                            <Icon name="info" size="sm" />
                            <span>{feature.tip}</span>
                        </footer>
                    </article>
                ))}
            </section>

            <section className="user-guide__steps mt-6" aria-label="빠른 시작 단계">
                <header>
                    <p className="user-guide__eyebrow">Quick Start</p>
                    <h2>5분 만에 둘러보기</h2>
                    <p>아래 순서대로 따라 하면 주요 기능을 놓치지 않고 경험할 수 있습니다.</p>
                </header>
                <ol>
                    {quickStartSteps.map((step, index) => (
                        <li key={step.title}>
                            <div className="user-guide__badge">{index + 1}</div>
                            <div>
                                <h3 className="user-guide__text">{step.title}</h3>
                                <p>{step.detail}</p>
                                {/* <Link href={step.action.href}>{step.action.label}</Link> */}
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* <section className="user-guide__detail mt-6" aria-label="상세 모달 사용법">
                <div>
                    <p className="user-guide__eyebrow">Detail Modal</p>
                    <h2>상세 모달로 모든 정보를 한 번에</h2>
                    <p>
                        우측에서 슬라이드되는 패널에 소개, 탭, 댓글이 구획별로 나뉘어 있어 집중해서
                        정보를 얻을 수 있습니다.
                    </p>
                    <ul>
                        <li>상단 히어로: 사진, 찜 버튼, 공유 버튼</li>
                        <li>탭 영역: 상세 정보 · 통계 · 메뉴 · 리뷰</li>
                        <li>기능 패널: 길찾기, 전화, 북마크, 신고</li>
                    </ul>
                    <Link
                        href="/detail/sample-place"
                        className="user-guide__button user-guide__button--primary"
                    >
                        모달 살펴보기
                    </Link>
                </div>
                <div className="user-guide__detail-panel" aria-hidden="true">
                    <span>모달 프리뷰</span>
                </div>
            </section> */}

            <section className="user-guide__interactions mt-6" aria-label="상호작용 기능">
                {interactionCards.map((card) => (
                    <article key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <ul>
                            {card.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>

            <section className="user-guide__faq mt-6 mb-13" aria-label="자주 묻는 질문">
                <header>
                    <p className="user-guide__eyebrow">FAQ</p>
                    <h2>문제가 생기면 이렇게 해결하세요</h2>
                </header>
                <div className="user-guide__faq-list">
                    {faqItems.map((item) => (
                        <article key={item.q}>
                            <h3>{item.q}</h3>
                            <p>{item.a}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
