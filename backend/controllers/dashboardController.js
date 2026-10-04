const Expense = require("../models/Transaction");
const Income = require("../models/Income");

const getSummary = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const incomes = await Income.find({
      user: req.user.id,
    });

    const totalExpense = expenses.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const totalIncome = incomes.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const balance = totalIncome - totalExpense;

    return res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

const categoryAnalytics = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const categoryMap = {};

    expenses.forEach((expense) => {

      if (categoryMap[expense.category]) {

        categoryMap[expense.category] += expense.amount;

      } else {

        categoryMap[expense.category] = expense.amount;

      }

    });

    return res.status(200).json(categoryMap);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

const monthlyAnalytics = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user.id,
    });

    const monthlyMap = {};

    expenses.forEach((expense) => {

      const month = new Date(expense.date)
        .toLocaleString("default", {
          month: "long",
        });

      if (monthlyMap[month]) {

        monthlyMap[month] += expense.amount;

      } else {

        monthlyMap[month] = expense.amount;

      }

    });

    return res.status(200).json(monthlyMap);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getSummary, categoryAnalytics,
  monthlyAnalytics
};