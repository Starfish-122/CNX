/**
 * 지도 로딩
 */
export default function MapLoadingSpinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">지도를 로딩 중입니다...</p>
            </div>
        </div>
    );
}
