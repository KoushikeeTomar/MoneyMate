import {
  FaBriefcase,
  FaIndianRupeeSign,
  FaCalendar,
  FaPlus,
  FaPen,
  FaMoneyCheckDollar,
} from "react-icons/fa6";

function IncomeForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">

            {editId ? "Update Income" : "Add New Income"}

          </h2>

          <p className="text-gray-500 mt-1">
            Record every source of income.
          </p>

        </div>

        <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl">

          {editId ? <FaPen size={24} /> : <FaPlus size={24} />}

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        {/* TITLE */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Income Title
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaBriefcase className="text-gray-400" />

            <input
              type="text"
              name="title"
              placeholder="July Salary"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        {/* AMOUNT */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Amount
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaIndianRupeeSign className="text-gray-400" />

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="25000"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        {/* SOURCE */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Source
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaMoneyCheckDollar className="text-gray-400" />

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-3 outline-none bg-transparent"
            >
              <option value="">Select Source</option>
              <option>Salary</option>
              <option>Freelancing</option>
              <option>Business</option>
              <option>Investments</option>
              <option>Scholarship</option>
              <option>Part-Time</option>
              <option>Other</option>
            </select>

          </div>

        </div>

        {/* DATE */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Date
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaCalendar className="text-gray-400" />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <div className="md:col-span-2">

          <button
            className="
            w-full
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            py-4
            rounded-xl
            font-semibold
            transition
          "
          >
            {editId ? "Update Income" : "Add Income"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default IncomeForm;