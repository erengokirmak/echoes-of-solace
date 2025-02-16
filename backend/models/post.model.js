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
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Post", PostSchema)

export default Product