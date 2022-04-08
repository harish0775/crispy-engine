const mongoose = require("mongoose");
const env = require("./environment");

const dba = 'mongodb+srv://Node-Express:abhi@8800express@cluster0.3a6vn.mongodb.net/expressapp?retryWrites=true&w=majority';
 mongoose.connect(dba,{ useNewUrlParser: true,useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in conncting to DB"));

db.once("open", function () {
  console.log("connected to database::MOngoDb");
});

module.exports = db;
