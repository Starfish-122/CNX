export default function MapLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-rows-[60px_1fr_20px] items-center justify-items-center min-h-screen gap-16">
            {children}
        </div>
    );
}
