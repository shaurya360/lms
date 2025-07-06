// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import courseProgressRoute from "./routes/courseProgress.route.js";
// import path from "path";

// dotenv.config({});

// // call database connection here
// connectDB();
// const app = express();

// app.use(express.static(path.join(__dirname, '../client/dist')));

// const PORT = 8080;

// // default middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));
 
// // apis
// app.use("/api/v1/media", mediaRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);
// app.use("/api/v1/progress", courseProgressRoute);

// app.use(express.static(path.join(__dirname,"../client/dist")))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(_dirname,"../client/dist/index.html"))
// })
 
 
// app.listen(PORT, () => {
//     console.log(`Server listen at port ${PORT}`);
// })

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";



const _dirname = path.resolve();

dotenv.config({});

// call database connection here
connectDB();
const app = express();

const PORT = process.env.PORT || 8080; // Use process.env.PORT for Vercel

// default middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173", // Make sure this is updated for your production frontend URL on Vercel
    credentials: true
}));

// apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// Serve static files from the client/dist directory
// This handles your frontend's built assets (HTML, CSS, JS, images, etc.)
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// For any other GET request, serve the index.html file
// This is crucial for single-page applications (SPAs) to handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});

