export default function CardListTemplateSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-2 p-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-md p-2 w-full h-full shadow-sm space-y-2 bg-blue-gray-800 animate-pulse">
          <div className="w-full h-10 bg-gray-500 animate-pulse rounded-md" />
          <div >
            <div className="w-full h-32 bg-gray-500 animate-pulse rounded-md" />
          </div>
        </div>
      ))}
    </div>

  )
}