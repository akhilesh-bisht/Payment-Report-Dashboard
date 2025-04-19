import express from "express";
import {
  getSummaryReport,
  getPaginatedEntries,
  getOutstandingReport,
  getEmployeePaymentReport,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getSummaryReport);
router.get("/entries", protect, getPaginatedEntries);
router.get("/outstanding", protect, getOutstandingReport);
router.get("/employee/:employeeId", protect, getEmployeePaymentReport);

export default router;
