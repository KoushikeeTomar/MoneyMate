import { useEffect, useMemo, useState } from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import API from "../services/api";

import IncomeForm from "../components/IncomeForm";
import IncomeCard from "../components/IncomeCard";
import IncomeSearchFilter from "../components/IncomeSearchFilter";

function Income() {

  // ============================
  // FORM STATE
  // ============================

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    source: "",
    date: "",
  });

  // ============================
  // INCOME DATA
  // ============================

  const [income, setIncome] = useState([]);

  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedSource, setSelectedSource] =
    useState("");

  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ============================
  // FETCH INCOME
  // ============================

  const fetchIncome = async () => {

    try {

      const response = await API.get("/income");

      setIncome(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchIncome();

  }, []);

  // ============================
  // ADD / UPDATE
  // ============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        const response = await API.put(
          `/income/${editId}`,
          formData
        );

        alert(response.data.message);

        setEditId(null);

      } else {

        const response = await API.post(
          "/income",
          formData
        );

        alert(response.data.message);

      }

      fetchIncome();

      setFormData({
        title: "",
        amount: "",
        source: "",
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

  const deleteIncome = async (id) => {

    try {

      const response = await API.delete(
        `/income/${id}`
      );

      alert(response.data.message);

      fetchIncome();

    } catch (error) {

      console.log(error);

    }

  };

  // ============================
  // EDIT
  // ============================

  const editIncome = (item) => {

    setEditId(item._id);

    setFormData({
      title: item.title,
      amount: item.amount,
      source: item.source,
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

    setSelectedSource("");

  };

  // ============================
  // FILTERED INCOME
  // ============================

  const filteredIncome = useMemo(() => {

    return income.filter((item) => {

      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesSource =
        selectedSource === "" ||
        item.source === selectedSource;

      return matchesSearch && matchesSource;

    });

  }, [income, searchTerm, selectedSource]);

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              Income
            </h1>

            <p className="text-gray-500 mt-2">
              Track all your income sources in one place.
            </p>

          </div>

          <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600">

            <FaMoneyBillTrendUp size={28} />

          </div>

        </div>

        {/* FORM */}

        <IncomeForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
        />

        {/* FILTER */}

        <div className="mt-8">

          <IncomeSearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            clearFilters={clearFilters}
          />

        </div>

        {/* COUNT */}

        <div className="mb-6">

          <h2 className="text-xl font-semibold text-gray-700">

            {filteredIncome.length} Income
            {filteredIncome.length !== 1 ? " Entries" : " Entry"}

          </h2>

        </div>

        {/* LIST */}
                {filteredIncome.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-lg py-20 text-center">

            <div className="text-6xl mb-5">
              💰
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No income found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your filters or add a new income source.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredIncome.map((item) => (

              <IncomeCard
                key={item._id}
                item={item}
                onEdit={editIncome}
                onDelete={deleteIncome}
              />

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Income;