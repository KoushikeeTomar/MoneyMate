import {
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
  FaChartLine,
  FaGraduationCap,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPen,
  FaTrash,
} from "react-icons/fa";

function IncomeCard({ item, onEdit, onDelete }) {

  const getSourceIcon = (source) => {

    switch (source) {

      case "Salary":
        return <FaBriefcase />;

      case "Freelancing":
        return <FaLaptopCode />;

      case "Business":
        return <FaBuilding />;

      case "Investments":
        return <FaChartLine />;

      case "Scholarship":
        return <FaGraduationCap />;

      default:
        return <FaMoneyBillWave />;

    }

  };

  const getSourceColor = (source) => {

    switch (source) {

      case "Salary":
        return "bg-emerald-100 text-emerald-700";

      case "Freelancing":
        return "bg-blue-100 text-blue-700";

      case "Business":
        return "bg-purple-100 text-purple-700";

      case "Investments":
        return "bg-yellow-100 text-yellow-700";

      case "Scholarship":
        return "bg-pink-100 text-pink-700";

      default:
        return "bg-gray-100 text-gray-700";

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
        border
        border-gray-100
        p-6
      "
    >

      {/* TOP */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            {item.title}
          </h2>

          <div
            className={`
              inline-flex
              items-center
              gap-2
              mt-3
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
              ${getSourceColor(item.source)}
            `}
          >

            {getSourceIcon(item.source)}

            {item.source}

          </div>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-400">
            Income
          </p>

          <h2 className="text-3xl font-bold text-emerald-600">
            ₹{item.amount}
          </h2>

        </div>

      </div>

      {/* DATE */}

      <div className="flex items-center gap-2 mt-6 text-gray-500">

        <FaCalendarAlt />

        <span>

          {new Date(item.date).toLocaleDateString()}

        </span>

      </div>

      {/* BUTTONS */}

      <div className="flex gap-4 mt-8">

        <button
          onClick={() => onEdit(item)}
          className="
            flex-1
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            flex
            items-center
            justify-center
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
            items-center
            justify-center
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

export default IncomeCard;