export default function CardHomeSkeleton() {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      <div className="md:col-span-3 col-span-1 grid md:grid-cols-2 grid-cols-1 w-full gap-2">
        <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
        <div className="bg-gray-600 animate-pulse rounded-md w-full h-full shadow-md text-white p-3 min-h-[150px]" />
      </div>
    </div>
  );
}
