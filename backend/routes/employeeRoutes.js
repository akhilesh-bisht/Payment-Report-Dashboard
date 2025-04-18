// routes/employeeRoutes.js
import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
} from "../controllers/employee.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createEmployee);
router.get("/", protect, getEmployees);
router.get("/:id", protect, getEmployeeById);

export default router;
