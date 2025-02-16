import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"]
    },
    body: {
      type: String,
      required: [true, "Post must have a body"]
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Post must have an author"]
    }
  },
  {
    timestamps: true
  }
)

const Post = mongoose.model("Post", PostSchema)

export default Post 