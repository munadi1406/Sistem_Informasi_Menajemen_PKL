export default function TableSkeleton() {
    return (
        <div
            className={`bg-gray-600 h-[80vh] animate-pulse w-full rounded-md `}
        >
            <div className="w-full p-4 flex flex-col gap-4">
                <div className="bg-blue-gray-100 animate-pulse w-full rounded-md h-10" />
                <div className="bg-blue-gray-100 animate-pulse w-full rounded-md h-10" />
            </div>
            {/* table */}
            <div className="bg-blue-gray-100 w-full h-72">
                
            </div>
            <div className="p-4 w-full">
                <div className="bg-blue-gray-100 animate-pulse w-32 rounded-md h-10" />
            </div>
        </div>
    )
}
