export default function CardHomeSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="col-span-3 grid grid-cols-2 w-full gap-2">
        <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
        <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      </div>
    </div>
  );
}
