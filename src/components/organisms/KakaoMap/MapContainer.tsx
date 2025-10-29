interface MapContainerProps {
    id: string;
    className?: string;
}

/**
 * 지도 컨테이너
 */
export default function MapContainer({ id, className = 'w-full h-full' }: MapContainerProps) {
    return <div id={id} className={className} style={{ minHeight: '400px' }} />;
}
