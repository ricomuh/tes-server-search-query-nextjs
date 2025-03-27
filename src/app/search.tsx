"use client";
import { useState, useEffect } from "react";

export default function Search({ searchQuery }: { searchQuery: string }) {
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        window.location.href = `?search=${inputValue}`;
      }
    }, 500); // 500ms debounce interval

    return () => clearTimeout(timer); // Cleanup the timer on unmount or input change
  }, [inputValue, searchQuery]);

  return (
    <div className="flex items-center mb-4">
      <label htmlFor="search" className="mr-2 text-gray-700">
        Search:
      </label>
      <input
        type="text"
        id="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
    </div>
  );
}
