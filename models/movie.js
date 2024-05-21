import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUrl = process.env.MONGO_URI; 
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const movieschema = new mongoose.Schema({
name: String,
link: String,
description: String,
image: String,
comments:[
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
]
});
 
const movie = mongoose.model("Movie", movieschema);

export default movie;
