import Transaction from "../models/Transaction.js";
import Employee from "../models/employee.model.js";

// 🔹 1. GET Summary - Total Collection, Total Deposit, Difference
export const getSummaryReport = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });

    const totalCollection = transactions.reduce(
      (sum, tx) => sum + tx.collectionAmount,
      0
    );
    const totalDeposit = transactions.reduce(
      (sum, tx) => sum + tx.depositAmount,
      0
    );
    const difference = totalCollection - totalDeposit;

    res.status(200).json({ totalCollection, totalDeposit, difference });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 2. GET Paginated Entry List for Table
export const getPaginatedEntries = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const transactions = await Transaction.find({ user: req.user._id })
      .populate("employee")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalEntries = await Transaction.countDocuments({
      user: req.user._id,
    });
    const totalPages = Math.ceil(totalEntries / limit);

    const entries = transactions.map((tx) => ({
      id: tx.employee,
      location: tx.employee.location,
      empId: tx.employee.employeeId,
      empName: tx.employee.name,
      collection: tx.collectionAmount,
      date: tx.date,
      cashDeposit: tx.depositAmount,
      depositDate: tx.depositDate,
      difference: tx.collectionAmount - tx.depositAmount,
    }));

    res.status(200).json({
      entries,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 3. Outstanding Report (Per Employee)
export const getOutstandingReport = async (req, res) => {
  try {
    const employees = await Employee.find({ user: req.user._id });
    const report = [];

    for (let employee of employees) {
      const { netCollection, mostRecentDate } = await calculateNetCollection(
        employee._id
      );
      report.push({
        employeeName: employee.name,
        employeeId: employee.employeeId,
        netCollection,
        mostRecentDate,
      });
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🔹 4. Employee Payment Report
export const getEmployeePaymentReport = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const report = await generatePaymentReport(employeeId);
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📦 Helper: Net Collection + Last Date
const calculateNetCollection = async (employeeId) => {
  const transactions = await Transaction.find({ employee: employeeId }).sort({
    date: 1,
  });
  let netCollection = 0;
  let mostRecentDate = null;

  transactions.forEach((tx) => {
    netCollection += tx.collectionAmount - tx.depositAmount;
    mostRecentDate = tx.date;
  });

  return { netCollection, mostRecentDate };
};

// 📦 Helper: Detailed Payment Report
const generatePaymentReport = async (employeeId) => {
  const transactions = await Transaction.find({ employee: employeeId }).sort({
    date: 1,
  });

  let report = [];
  let remainingBalance = 0;

  for (let tx of transactions) {
    let { collectionAmount, depositAmount, date, depositDate } = tx;

    // Carry forward logic
    if (remainingBalance > 0) {
      if (depositAmount < remainingBalance) {
        remainingBalance -= depositAmount;
        depositAmount = 0;
      } else {
        depositAmount -= remainingBalance;
        remainingBalance = 0;
      }
    }

    let diff = collectionAmount - depositAmount;
    remainingBalance = diff;

    report.push({
      collectionAmount,
      collectionDate: date,
      depositAmount,
      depositDate,
      difference: diff,
    });
  }

  return report;
};
