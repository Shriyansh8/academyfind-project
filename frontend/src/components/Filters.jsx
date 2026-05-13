const Filters = ({ category, setCategory }) => {
  return (
    <div className="flex flex-wrap gap-4">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-gray-50 border border-gray-200 px-5 py-4 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-200 text-lg transition duration-300"
      >
        <option value="">All Categories</option>
        <option value="IIT-JEE">IIT-JEE</option>
        <option value="NEET">NEET</option>
        <option value="Programming">Programming</option>
      </select>

    </div>
  );
};

export default Filters;