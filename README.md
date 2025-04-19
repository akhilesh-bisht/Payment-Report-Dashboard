# Payment-Report-Dashboard

Employee & Transaction Management System
This is a web application for managing employee and transaction data. It allows for adding new employees and their corresponding transactions in a simple and efficient way.

Features
Employee Management

Add new employees with details like name, employee ID, and location.

Automatically generate unique employee IDs.

Transaction Management

Create and manage employee transactions with details such as collection amount, deposit amount, collection date, and deposit date.

Error Handling

Validation for required fields (Employee and Transaction).

Display error messages if something goes wrong during the process.

Technologies Used
Frontend

React.js for building the UI.

Axios for making API requests.

Tailwind CSS for styling.

Backend

Node.js with Express.js to handle API requests.

MongoDB for database storage.

Mongoose for interacting with MongoDB.

Project Setup
Prerequisites
Node.js (v14.x or above)

MongoDB (Local or Atlas Cluster)

Steps to Run the Project
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/employee-transaction-system.git
cd employee-transaction-system
Install Backend Dependencies

Go to the backend directory and install the dependencies.

bash
Copy
Edit
cd backend
npm install
Set Up Environment Variables

Create a .env file in the backend root folder and define the following variables:

ini
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/employeeTransactionDB
JWT_SECRET=your_jwt_secret_key
PORT=5000
Run the Backend Server

bash
Copy
Edit
npm start
The backend API will now be running on http://localhost:5000.

Install Frontend Dependencies

Go to the frontend directory and install the dependencies.

bash
Copy
Edit
cd frontend
npm install
Run the Frontend Server

bash
Copy
Edit
npm start
The frontend application will now be available at http://localhost:3000.

API Endpoints
POST /api/employees – Create a new employee.

Request Body:

json
Copy
Edit
{
"name": "Aman",
"employeeId": "EMP007",
"location": "Kotdwara"
}
POST /api/transactions – Create a new transaction for an employee.

Request Body:

json
Copy
Edit
{
"employeeId": "6804147cb49837ec7ecac134",
"collectionAmount": 5000,
"depositAmount": 2000,
"date": "2025-04-20",
"depositDate": "2025-04-20"
}
Folder Structure
pgsql
Copy
Edit
employee-transaction-system/
├── backend/
│ ├── models/
│ │ ├── Employee.js
│ │ └── Transaction.js
│ ├── routes/
│ │ ├── employeeRoutes.js
│ │ └── transactionRoutes.js
│ ├── controllers/
│ │ ├── employeeController.js
│ │ └── transactionController.js
│ ├── app.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── InsertEmployeeAndTransaction.jsx
│ │ ├── api/
│ │ │ └── api.js
│ │ └── App.jsx
│ ├── public/
│ └── package.json
└── README.md
Contributing
Fork the repository

Create a new branch (git checkout -b feature-name)

Commit your changes (git commit -am 'Add new feature')

Push to the branch (git push origin feature-name)

Create a new Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize this README as per your project details!
