import { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(() => 
    debounce((username) => {
      if (username) onSearch(username);
    }, 600), 
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSearch.flush(); // ⬅️ Force call immediately on Enter
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-6">
      <input
        type="text"
        name="username"
        placeholder="Enter GitHub username"
        value={inputValue}
        onChange={handleChange}
        className="w-64 px-4 py-2 rounded-md shadow-md border border-gray-400 dark:border-gray-600 bg-white dark:bg-[#161b22] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Search
      </button>
    </form>
  );
}
