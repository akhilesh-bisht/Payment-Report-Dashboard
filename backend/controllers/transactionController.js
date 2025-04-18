import Transaction from "../models/Transaction.js";
import Employee from "../models/Employee.js";

export const createTransaction = async (req, res) => {
  try {
    const { employeeId, collectionAmount, depositAmount, date } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const transaction = new Transaction({
      employee: employeeId,
      collectionAmount,
      depositAmount,
      date,
      user: req.user._id, // admin user
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
