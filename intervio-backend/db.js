const mongoose = require('mongoose');

const connectToMongo = async () => {

    try{
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Mongo Successfully");
    } catch(err){
        console.error("Mongoose connection error: ", err);
    }
};

module.exports = connectToMongo;