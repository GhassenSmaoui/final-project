const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
         .connect(process.env.MONGO_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         }) 
         console.log("the database is connected")
  } catch (error) {
    console.error(error) 
  }
};

module.exports=connectDB


// mongoose
//     .connect("mongodb://127.0.0.1:27017/ws-Auth", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((res = console.log("the database is connected")))
//     .catch((err) => console.error(err))