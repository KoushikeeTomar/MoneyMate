const mongoose = require("mongoose");

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDb");
    }
    catch(error){
        console.log(`database connection error ${error}`);
        process.exit(1);
    }
}

module.exports = connectDb;