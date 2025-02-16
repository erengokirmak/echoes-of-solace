import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    parent: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Comment must have a parent"]
    },
    author: {
      type: mongoose.SchemaType.ObjectId,
      required: [true, "Comment must have an author"]
    },
    content: {
      type: String,
      required: [true, "Comment must have content"]
    }
  },
  {
    timestamps: true
  }
)

const Comment = mongoose.model("Comment", CommentSchema)

export default Comment