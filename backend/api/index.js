 import dotenv from 'dotenv'
import express from 'express'
import mongoose from  'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRouter from '../routes/userRoutes.js'
import jobRouter from '../routes/jobRoutes.js'
import applicationRouter from '../routes/applicationRoutes.js'
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['https://roojgar.vercel.app','http://localhost:5173'],// Allow only this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allow only specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));


const port = process.env.PORT  || 8080
const dbconection = process.env.DBCONNECTION.replace("<password>",process.env.MONGODB_PASS)
// import app from "./app.js";
// import cloudinary from "cloudinary";
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
mongoose.connect(dbconection).then((con)=>{
  console.log("database connected");
}).catch((err)=>{
  console.log(err);
})



// console.log( process.env.CLOUDINARY_CLIENT_NAME,)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.use("/api/v1/user",userRouter)
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

// import mongoose from 'mongoose';

// // Verify the MONGODB_URI environment variable
// const mongoURI = process.env.MONGODB_URI;
// if (!mongoURI) {
//   console.error("MONGODB_URI environment variable is not set.");
//   process.exit(1); // Exit the process if MONGODB_URI is not set
// }

// // Establish MongoDB connection
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Add your server listening code here
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process if connection fails
//   });
