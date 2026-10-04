import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

function IncomeSearchFilter({
  searchTerm,
  setSearchTerm,
  selectedSource,
  setSelectedSource,
  clearFilters,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

      <div className="flex items-center gap-3 mb-6">

        <FaFilter className="text-emerald-600 text-xl" />

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
            placeholder="Search income..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full p-3 outline-none"
          />

        </div>

        {/* SOURCE */}

        <select
          value={selectedSource}
          onChange={(e) =>
            setSelectedSource(e.target.value)
          }
          className="
            border
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-emerald-500
          "
        >

          <option value="">
            All Sources
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Freelancing">
            Freelancing
          </option>

          <option value="Business">
            Business
          </option>

          <option value="Investments">
            Investments
          </option>

          <option value="Scholarship">
            Scholarship
          </option>

          <option value="Part-Time">
            Part-Time
          </option>

          <option value="Other">
            Other
          </option>

        </select>

        {/* CLEAR */}

        <button
          onClick={clearFilters}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            rounded-xl
            flex
            items-center
            justify-center
            gap-2
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

export default IncomeSearchFilter;