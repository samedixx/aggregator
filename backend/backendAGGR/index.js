import express from 'express';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import postRoutes from './routes/posts.js';
import cors from "cors";

import cookieParser from "cookie-parser";
const app = express();

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/posts", postRoutes);


app.listen(5000, () => {
    console.log("API Mounted.");
});