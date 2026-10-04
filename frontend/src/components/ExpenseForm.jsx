import {
  FaTag,
  FaIndianRupeeSign,
  FaList,
  FaCalendar,
  FaPlus,
  FaPen,
} from "react-icons/fa6";

function ExpenseForm({
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
            {editId ? "Update Expense" : "Add New Expense"}
          </h2>

          <p className="text-gray-500 mt-1">
            Keep your spending records up to date.
          </p>
        </div>

        <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">

          {editId ? (
            <FaPen size={24} />
          ) : (
            <FaPlus size={24} />
          )}

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        {/* TITLE */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Expense Title
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaTag className="text-gray-400" />

            <input
              type="text"
              name="title"
              placeholder="Netflix Subscription"
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
              placeholder="500"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        {/* CATEGORY */}

        <div>

          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>

          <div className="flex items-center border rounded-xl px-4">

            <FaList className="text-gray-400" />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 outline-none bg-transparent"
            >
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Education</option>
              <option>Healthcare</option>
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

        {/* BUTTON */}

        <div className="md:col-span-2">

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition duration-300"
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default ExpenseForm;