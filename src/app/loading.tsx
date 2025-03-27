export default function Loading() {
  return (
    // skeleton loading screen
    <div className="flex justify-center items-center h-screen">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
            <div className="h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
//           href={`?page=${page - 1}`}
