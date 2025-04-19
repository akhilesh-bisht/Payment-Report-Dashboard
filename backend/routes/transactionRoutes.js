import express from "express";
import {
  createTransaction,
  getEmployeeTransactions,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/:id", protect, getEmployeeTransactions); // :id = employeeId

export default router;
