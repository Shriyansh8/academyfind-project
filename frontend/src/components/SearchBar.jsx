const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search coaching institutes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg transition duration-300"
      />
    </div>
  );
};

export default SearchBar;