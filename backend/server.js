import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/db.js";
import employeRoute from "./routes/employeeRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Only keep the custom CORS setup
const allowedOrigin = "https://payment-report-dashboard.vercel.app/";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Allow cookies/headers from frontend
  })
);

app.use(express.json());

// MongoDB connection
connectDB();

// Routes
app.use("/api/users", userRoute);
app.use("/api/employees", employeRoute);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with import syntax!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
