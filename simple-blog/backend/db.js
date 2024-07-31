const mongoose = require("mongoose")
const url ="mongodb+srv://dk376907:dk376907@blog0.xwa8p5g.mongodb.net/?retryWrites=true&w=majority&appName=Blog0"

const connectDb = async ()=>{
    try{
        await mongoose.connect(url);
        console.log("Connected to the MongoDB server")
    }
    catch(error){
        console.log("Error connecting to the server");
        process.exit(1);
    }
}

module.exports = connectDb;