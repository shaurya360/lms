import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./database/dbconnect.js";
import userroute from "./routes/user.route.js";
import courseroute from "./routes/course.route.js";
import mediaroute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import progressRoute from "./routes/courseProgress.route.js";

import path from "path";

const app = express();
const PORT = 8080;

dotenv.config({});
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const _dirname = path.resolve();

app.use("/api/v1/user",userroute);
app.use("/api/v1/media",mediaroute);
app.use("/api/v1/course",courseroute);
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress",progressRoute)



app.use(express.static(path.join(_dirname,"/client/dist")));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html")) 
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})