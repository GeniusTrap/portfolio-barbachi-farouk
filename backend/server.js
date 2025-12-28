import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';

import contactRoutes from "./routes/contactRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB().then(() => {
    console.log("✅ MongoDB Connected - Portfolio");
});

app.use(express.json());
app.use(cors({
  origin: [
    'https://faroukbarbachi.onrender.com',     // TON PORTFOLIO
    'https://portfolio-admin-farouk.onrender.com', // TON ADMIN
    'http://localhost:5173'                    // DEV LOCAL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use("/api/contacts", contactRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ 
        message: "🚀 Portfolio API Working",
        version: "1.0.0"
    });
});

app.listen(port, () => {
    console.log(`✅ Server started on PORT: ${port}`);
});