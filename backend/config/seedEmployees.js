import mongoose from "mongoose";
import connectDB from "./config/connectDB.js";
import Employee from "./models/employee.model.js";

const seedEmployees = async () => {
  await connectDB();

  await Employee.deleteMany();

  const dummy = [
    { name: "Aisha", employeeId: "EMP102", location: "Mumbai" },
    { name: "Ravi", employeeId: "EMP103", location: "Bangalore" },
    { name: "Neha", employeeId: "EMP104", location: "Chennai" },
    { name: "Arjun", employeeId: "EMP105", location: "Kolkata" },
  ];

  await Employee.insertMany(dummy);
  console.log("🌱 Dummy employees seeded");
  process.exit();
};

seedEmployees();
