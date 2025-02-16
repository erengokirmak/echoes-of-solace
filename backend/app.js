import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import Product from './models/post.model.js';
import 'dotenv/config'
import bodyParser from 'body-parser';

// Configure MongoDB cluster connection
const uri =
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@eos-cluster.wjath.mongodb.net/?retryWrites=true&w=majority&appName=eos-cluster`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// Create express app middleware
const app = express()

// Middleware for safer response headers
app.use(helmet())

app.use(bodyParser.json())

app.get("/", (_, res) => {
  res.send("Pong")
})

app.post("/api/post", async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})


mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to the database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch(() => {
    console.log("There was an error connecting to the database")
  })