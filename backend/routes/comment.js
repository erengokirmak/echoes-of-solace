import express from "express";
import Comment from "../models/comment.model.js"
import Post from "../models/post.model.js";
import mongoose, { ObjectId } from "mongoose";

const commentRouter = express.Router()

/**
 * 
 * @param {ObjectId} postId 
 * @returns 
 */
async function getCommentsOfPost(postId) {
  const topLevelComments = Comment.find({ parent: postId }).lean()
  let commentsList = []
  for (let comment in topLevelComments) {
    comment.push(await getCommentWithReplies(comment._id))
  }
  return commentsList
}
/**
 * Returns the comment and the tree of comments
 * that is formed from its replies
 * @param {ObjectId} commentId
 * @returns the comment tree, where the comment with commentId is at the top
 */
async function getCommentWithReplies(commentId) {
  // Helper function to recursively fetch replies
  async function fetchReplies(comment) {
    const replies = await Comment.find({ parent: comment._id }).lean();
    for (let reply of replies) {
      reply.children = await fetchReplies(reply);
    }
    return replies;
  }

  // Fetch the main comment
  const comment = await Comment.findById(commentId).lean();
  if (!comment) {
    throw new Error('Comment not found');
  }

  // Fetch and attach replies
  comment.children = await fetchReplies(comment);
  return comment;
}

commentRouter.get("/onPost/:postId", async (req, res) => {
  if (!ObjectId.isValid(req.params.postId)) {
    res.status(400).send("Id is not valid")
    return
  }

  if (!await Post.exists({ _id: req.params.postId })) {
    res.status(404).send("Post could not be found")
    return
  }

  try {
    res.json(await getCommentsOfPost(req.params.postId))
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
})

// Returns a reply with a specific ID, along with all its 
commentRouter.get("/:commentId", async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  console.log(req.params.commentId)
  if (!ObjectId.isValid(req.params.commentId)) {
    res.status(400).send("Id is not valid")
    return
  }

  return await getCommentWithReplies(req.params.commentId);
})

export default commentRouter