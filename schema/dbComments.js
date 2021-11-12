import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  postId: Number,
  id: Number,
  name: String,
  email: String,
  body: String,
});

export default mongoose.model("Comment", commentSchema);
