import { useEffect, useMemo, useState } from "react";
import { FaWallet } from "react-icons/fa";

import API from "../services/api";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import SearchFilter from "../components/SearchFilter";

function Expenses() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);

  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  // ============================
  // INPUT CHANGE
  // ============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // FETCH EXPENSES
  // ============================

  const fetchExpenses = async () => {
    try {
      const response = await API.get("/expenses");

      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // ============================
  // ADD / UPDATE
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const response = await API.put(
          `/expenses/${editId}`,
          formData
        );

        alert(response.data.message);

        setEditId(null);
      } else {
        const response = await API.post(
          "/expenses",
          formData
        );

        alert(response.data.message);
      }

      fetchExpenses();

      setFormData({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  // ============================
  // DELETE
  // ============================

  const deleteExpense = async (id) => {
    try {
      const response = await API.delete(
        `/expenses/${id}`
      );

      alert(response.data.message);

      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // EDIT
  // ============================

  const editExpense = (item) => {
    setEditId(item._id);

    setFormData({
      title: item.title,
      amount: item.amount,
      category: item.category,
      date: item.date
        ? item.date.split("T")[0]
        : "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ============================
  // CLEAR FILTERS
  // ============================

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  // ============================
  // FILTERED EXPENSES
  // ============================

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Expenses
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and organize all your spending.
            </p>

          </div>

          <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600">
            <FaWallet size={28} />
          </div>

        </div>

        {/* FORM */}

        <ExpenseForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        {/* FILTER */}

        <div className="mt-8">

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            clearFilters={clearFilters}
          />

        </div>

        {/* COUNT */}

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-gray-700">

            {filteredExpenses.length} Expense
            {filteredExpenses.length !== 1 ? "s" : ""}

          </h2>

        </div>

        {/* LIST */}

        {filteredExpenses.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

            <div className="text-6xl mb-5">
              💸
            </div>

            <h2 className="text-2xl font-bold text-gray-700">

              No expenses found

            </h2>

            <p className="text-gray-500 mt-3">

              Try changing your filters or add a new expense.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredExpenses.map((item) => (

              <ExpenseCard
                key={item._id}
                item={item}
                onEdit={editExpense}
                onDelete={deleteExpense}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Expenses;