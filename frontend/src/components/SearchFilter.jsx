import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  clearFilters,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="text-blue-600 text-xl" />

        <h2 className="text-2xl font-bold text-gray-800">
          Search & Filter
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        {/* SEARCH */}

        <div className="flex items-center border rounded-xl px-4">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 outline-none"
          />

        </div>

        {/* CATEGORY */}

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="
            border
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Other">Other</option>
        </select>

        {/* CLEAR */}

        <button
          onClick={clearFilters}
          className="
            flex
            items-center
            justify-center
            gap-2
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-xl
            font-semibold
            transition
          "
        >
          <FaTimes />
          Clear Filters
        </button>

      </div>

    </div>
  );
}

export default SearchFilter;