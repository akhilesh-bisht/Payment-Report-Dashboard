import Employee from "../models/employee.model.js";

// ✅ Add a new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, employeeId } = req.body;

    const existing = await Employee.findOne({ employeeId });
    if (existing) {
      return res.status(400).json({ message: "Employee ID already exists" });
    }

    const newEmployee = new Employee({
      name,
      employeeId,
      user: req.user._id, // assuming auth middleware sets req.user
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get all employees of logged-in user (admin)
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ user: req.user._id });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get a single employee (by ID)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
