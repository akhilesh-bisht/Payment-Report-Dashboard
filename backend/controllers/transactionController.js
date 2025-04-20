import Transaction from "../models/Transaction.js";
import Employee from "../models/employee.model.js";

export const createTransaction = async (req, res) => {
  try {
    const { employeeId, collectionAmount, depositAmount, date, depositDate } =
      req.body;

    if (!employeeId || !date || !depositDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Duplicate check removed — every transaction will be saved
    const transaction = new Transaction({
      employee: employeeId,
      collectionAmount,
      depositAmount,
      date,
      depositDate,
      user: req.user._id,
    });

    await transaction.save();

    res.status(201).json({ message: "Transaction saved", transaction });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getEmployeeTransactions = async (req, res) => {
  try {
    const employeeId = req.params.id;

    const transactions = await Transaction.find({ employee: employeeId }).sort({
      date: 1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
