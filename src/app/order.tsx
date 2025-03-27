"use client";

export default function Order({ orderBy }: { orderBy: string }) {
  // latest, oldest, a-z, z-a

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ];

  return (
    <div className="flex items-center mb-4">
      <label htmlFor="sort" className="mr-2 text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={orderBy}
        onChange={(e) => (window.location.href = `?sort=${e.target.value}`)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
