import Employee from "../models/employee.model.js";

//  Add a new employee (allow duplicates)
export const createEmployee = async (req, res) => {
  try {
    const { name, employeeId, location } = req.body;

    const newEmployee = new Employee({
      name,
      employeeId,
      location,
      user: req.user._id, // assuming auth middleware sets req.user
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get all employees of the logged-in user
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ user: req.user._id });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  Get a single employee by ID (only if it belongs to the user)
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
