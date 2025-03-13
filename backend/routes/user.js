import express from "express";

const userRouter = express.Router()

userRouter.get("/", (_, res) => {
    res.sendStatus(501)
})