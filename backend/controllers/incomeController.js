const Income = require("../models/Income");

const addIncome = async (req, res) => {
  try {

    const { title, amount, source, date } = req.body;

    const income = await Income.create({
      title,
      amount,
      source,
      date,
// this id means id generated via jwt token
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Income added successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getIncome = async (req, res) => {
  try{
    const income = await Income.find({
      // fetch only those income whose user's field matches with logged in user's id
      user: req.user.id,
    });
    return res.status(200).json(income);
  }
  catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
}

const deleteIncome = async(req, res) =>{
  try{
    const income = await Income.findById(req.params.id);
  if(!income){
    return res.status(404).json({
      message: "Income not found",
    });
    }
    // req.user.id = curr.user
    if (income.user.toString() !== req.user.id){
      return res.status(401).json({
        message: "Not authorized",
      });
   }   
      await income.deleteOne();
      return res.status(200).json({
        message:"income Deleted Successfully",
      });
  }
  catch(error){
    return res.status(500).json({
      message: error.message,
    });
  }
}

const updateIncome = async (req, res) => {

  try {

    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    // Check ownership
    // authorization
    if (income.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const { title, amount, source, date } = req.body;
    //  partial update
    income.title = title || income.title;

    income.amount = amount || income.amount;

    income.source = source || income.source;

    income.date = date || income.date;

    const updatedIncome = await income.save();

    return res.status(200).json({
      message: "Income updated successfully",
      updatedIncome,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addIncome, getIncome, deleteIncome, updateIncome
};