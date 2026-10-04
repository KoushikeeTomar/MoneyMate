const Expense = require("../models/Transaction");

const addExpense = async (req, res) => {
  try {

    const { title, amount, category } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
// this id means id generated via jwt token
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Expense added successfully",
      expense,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// const getExpenses = async (req, res) => {
//   try{
//     const expenses = await Expense.find({
//       // fetch only those expenses whose user's field matches with logged in user's id
//       user: req.user.id,
//     });
//     return res.status(200).json(expenses);
//   }
//   catch(error){
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// }
const getExpenses = async (req, res) => {

  try {

    const query = {
      user: req.user.id,
    };

    // Filtering

    if (req.query.category) {
      query.category = req.query.category;
    }

    // Search

    if (req.query.search) {
      query.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // Sorting

    let sortOption = {};

    if (req.query.sort === "latest") {
      sortOption = { createdAt: -1 };
    }

    if (req.query.sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // Pagination

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const expenses = await Expense.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.status(200).json(expenses);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

const deleteExpense = async(req, res) =>{
  try{
    const expense = await Expense.findById(req.params.id);
  if(!expense){
    return res.status(404).json({
      message: "Expense not found",
    });
    }
    // req.user.id = curr.user
    if (expense.user.toString() !== req.user.id){
      return res.status(401).json({
        message: "Not authorized",
      });
   }   
      await expense.deleteOne();
      return res.status(200).json({
        message:"Expense Deleted Successfully",
      });
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
    });
  }
}

const updateExpense = async (req, res) => {

  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Check ownership
    // authorization
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const { title, amount, category } = req.body;
    //  partial update
    expense.title = title || expense.title;

    expense.amount = amount || expense.amount;

    expense.category = category || expense.category;

    const updatedExpense = await expense.save();

    return res.status(200).json({
      message: "Expense updated successfully",
      updatedExpense,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addExpense, getExpenses, deleteExpense, updateExpense
};