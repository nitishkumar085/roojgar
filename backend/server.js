 import dotenv from 'dotenv'
import express from 'express'
import mongoose from  'mongoose'
import cors from 'cors'
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRouter from './routes/userRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import applicationRouter from './routes/applicationRoutes.js'
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
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


