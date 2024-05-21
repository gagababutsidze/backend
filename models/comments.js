import mongoose from "mongoose";

 
const commentSchema = new mongoose.Schema({
  movieId: String,
  comment: String,
  userId: String,
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Comment = mongoose.model('Comment', commentSchema)
export default Comment

