import express from "express";
import Post from "../models/post.model.js"

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
  res.json(await Post.find({}))
})

postRouter.post("/", async (req, res) => {
  try {
    let post = await Post.create(req.body)
    res.json(post)
  } catch (error) {
    console.log(error.message)
    res.sendStatus(500)
  }
})

export default postRouter