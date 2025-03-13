import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import 'dotenv/config'
import bodyParser from 'body-parser';
import postRouter from './routes/post.js';
import commentRouter from './routes/comment.js'

const app = express()

// Middleware for safer response headers
app.use(helmet())

// Middleware for parsing request bodies into json
app.use(bodyParser.json())

// TODO: Routing of all the endpoints
//app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)

// For the most basic debugging
app.get("/ping", (req, res) => {
  res.send(`Pinged at ${Date().toLocaleString()}`)
})

// Return a generic 404 message if no routes worked
app.use((req, res) => {
  res.sendStatus(404)
})

// Configure MongoDB cluster connection
const uri =
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@eos-cluster.wjath.mongodb.net/?retryWrites=true&w=majority&appName=eos-cluster`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Connecting to the database
mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to the database");
    // Only start the application if there is a database connection
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch(() => {
    console.log("There was an error connecting to the database")
  })