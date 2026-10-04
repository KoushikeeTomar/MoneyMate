import {
  FaUtensils,
  FaPlane,
  FaShoppingBag,
  FaFileInvoiceDollar,
  FaGamepad,
  FaGraduationCap,
  FaHeartbeat,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPen,
  FaTrash,
} from "react-icons/fa";

function ExpenseCard({ item, onEdit, onDelete }) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Food":
        return <FaUtensils />;
      case "Travel":
        return <FaPlane />;
      case "Shopping":
        return <FaShoppingBag />;
      case "Bills":
        return <FaFileInvoiceDollar />;
      case "Entertainment":
        return <FaGamepad />;
      case "Education":
        return <FaGraduationCap />;
      case "Healthcare":
        return <FaHeartbeat />;
      default:
        return <FaMoneyBillWave />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Food":
        return "bg-orange-100 text-orange-600";
      case "Travel":
        return "bg-sky-100 text-sky-600";
      case "Shopping":
        return "bg-pink-100 text-pink-600";
      case "Bills":
        return "bg-yellow-100 text-yellow-700";
      case "Entertainment":
        return "bg-purple-100 text-purple-600";
      case "Education":
        return "bg-indigo-100 text-indigo-600";
      case "Healthcare":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        p-6
        border
        border-gray-100
      "
    >
      {/* Top */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {item.title}
          </h2>

          <div
            className={`
              mt-3
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
              ${getCategoryColor(item.category)}
            `}
          >
            {getCategoryIcon(item.category)}
            {item.category}
          </div>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Expense
          </p>

          <h2 className="text-3xl font-bold text-red-500">
            ₹{item.amount}
          </h2>

        </div>

      </div>

      {/* Date */}

      <div className="flex items-center gap-2 mt-6 text-gray-500">

        <FaCalendarAlt />

        <span>
          {new Date(item.date).toLocaleDateString()}
        </span>

      </div>

      {/* Buttons */}

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => onEdit(item)}
          className="
            flex-1
            bg-yellow-400
            hover:bg-yellow-500
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            flex
            justify-center
            items-center
            gap-2
          "
        >
          <FaPen />
          Edit
        </button>

        <button
          onClick={() => onDelete(item._id)}
          className="
            flex-1
            bg-red-500
            hover:bg-red-600
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            flex
            justify-center
            items-center
            gap-2
          "
        >
          <FaTrash />
          Delete
        </button>

      </div>
    </div>
  );
}

export default ExpenseCard;