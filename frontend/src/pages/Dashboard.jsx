import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaMoneyBillWave,
  FaWallet,
  FaPiggyBank,
  FaRobot,
  FaArrowTrendUp,
} from "react-icons/fa6";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const fetchSummary = async () => {
    try {
      const response = await API.get("/dashboard/summary");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const health =
    summary.totalIncome === 0
      ? 0
      : Math.min(
          100,
          Math.round((summary.balance / summary.totalIncome) * 100)
        );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-[var(--text-secondary)] text-lg">
            Here's an overview of your financial activity.
          </p>
        </div>

        {/* Summary */}

        <div className="grid gap-6 md:grid-cols-3">

          {/* Income */}

          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Total Income
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[var(--success)]">
                  ₹{summary.totalIncome}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--success-light)]">
                <FaMoneyBillWave
                  className="text-[var(--success)]"
                  size={26}
                />
              </div>

            </div>

          </div>

          {/* Expense */}

          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Total Expense
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[var(--danger)]">
                  ₹{summary.totalExpense}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--danger-light)]">
                <FaWallet
                  className="text-[var(--danger)]"
                  size={24}
                />
              </div>

            </div>

          </div>

          {/* Balance */}

          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-[var(--shadow-sm)] p-6 hover:shadow-[var(--shadow-md)] transition-all">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-sm text-[var(--text-secondary)]">
                  Current Balance
                </p>

                <h2 className="mt-3 text-4xl font-bold text-[var(--primary)]">
                  ₹{summary.balance}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--primary-light)]">
                <FaPiggyBank
                  className="text-[var(--primary)]"
                  size={24}
                />
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          {/* Financial Health */}

          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-[var(--shadow-sm)] p-8">

            <div className="flex justify-between items-center">

              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Financial Health
              </h2>

              <FaArrowTrendUp
                className="text-[var(--success)]"
                size={22}
              />

            </div>

            <p className="mt-4 text-[var(--text-secondary)] leading-7">
              Your savings rate determines your financial health.
              Try to keep your expenses well below your income.
            </p>

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="text-sm text-[var(--text-secondary)]">
                  Health Score
                </span>

                <span className="font-semibold text-[var(--success)]">
                  {health}%
                </span>

              </div>

              <div className="w-full h-3 rounded-full bg-[var(--border-light)]">

                <div
                  className="h-3 rounded-full bg-[var(--success)] transition-all"
                  style={{ width: `${health}%` }}
                />

              </div>

            </div>

          </div>

          {/* AI */}

          <div className="bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-[var(--shadow-sm)] p-8">

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-[var(--primary-light)] flex items-center justify-center">

                <FaRobot
                  className="text-[var(--primary)]"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  AI Insights
                </h2>

                <p className="text-sm text-[var(--text-secondary)]">
                  Coming Soon
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-3">

              <div className="rounded-xl bg-[var(--background)] p-4">
                💡 Spending analysis based on your transactions
              </div>

              <div className="rounded-xl bg-[var(--background)] p-4">
                📈 Monthly financial reports
              </div>

              <div className="rounded-xl bg-[var(--background)] p-4">
                🎯 Personalized budget recommendations
              </div>

              <div className="rounded-xl bg-[var(--background)] p-4">
                💰 Smart saving suggestions
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;