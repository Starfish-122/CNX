interface MapErrorMessageProps {
    error: string;
}

/**
 * 지도 에러 메시지
 */
export default function MapErrorMessage({ error }: MapErrorMessageProps) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center p-8">
                <p className="text-red-500 mb-4">{error}</p>
                <p className="text-sm text-gray-600">
                    카카오 개발자 콘솔에서 API 키와 도메인 설정을 확인해주세요.
                </p>
            </div>
        </div>
    );
}
