

export default function NavbarSkeleton() {
    return (
        <div
            className={`bg-gray-600 flex justify-between items-center px-4 h-16 animate-pulse rounded-xl transition-all sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5 `}
        >
            <div className="w-1/2">

                <div className="h-10 w-32 bg-blue-gray-100 animate-pulse rounded-md" />
            </div>
            <div className="w-1/2 flex justify-end items-center gap-7">
                <div className="h-10 w-10 bg-blue-gray-100 animate-pulse rounded-md" />
                <div className="h-10 w-40 bg-blue-gray-100 animate-pulse rounded-md" />
            </div>
        </div>
    )
}
