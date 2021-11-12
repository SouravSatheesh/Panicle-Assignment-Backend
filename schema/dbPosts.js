import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

export default mongoose.model("Post", postSchema);
