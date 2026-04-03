# Finance Dashboard Backend

A robust and scalable backend system for managing financial records with **role-based access control**, built using **Node.js, Express, and MongoDB**.

---

## Overview
This project simulates a real-world finance dashboard backend where different users interact with financial data based on their roles. It demonstrates backend architecture, authentication, authorization, and data aggregation.

---

## Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Security:** bcrypt (password hashing)  

---

## Role-Based Access Control

| Role    | Permissions |
|---------|------------|
| Viewer  | View records & dashboard |
| Analyst | View records & analytics |
| Admin   | Full access (CRUD + user management) |

---

## Features

### Authentication & Authorization
- User Registration & Login
- JWT-based authentication
- Role-based access control (RBAC)

---

### User Management
- Create and manage users
- Assign roles (viewer, analyst, admin)
- Active/Inactive user status

---

### Financial Records
- Create, Read, Update, Delete (CRUD)
- Fields:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filtering:
  - By type
  - By category
  - By date range

---

### Dashboard Analytics
- Total Income
- Total Expenses
- Net Balance
- Category-wise breakdown
- Recent transactions

---

### Security & Validation
- Password hashing using bcrypt
- JWT authentication middleware
- Role-based route protection
- Input validation & error handling

---

## Project Structure

```
finance-dashboard/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── app.js
│
├── server.js
├── .env
├── package.json
└── README.md
```

---

## Setup Instructions

### 1️. Clone Repository
```bash
git clone <your-repo-link>
cd finance-dashboard
```

### 2️. Install Dependencies
```bash
npm install
```

### 3️. Setup Environment Variables
Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4️. Run Server
```bash
npm run dev
```

---

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

---

### Users (Admin only)
- GET `/api/users`
- PATCH `/api/users/:id`
- DELETE `/api/users/:id`

---

### Records
- POST `/api/records`
- GET `/api/records`
- GET `/api/records/:id`
- PATCH `/api/records/:id`
- DELETE `/api/records/:id`

---

### Dashboard
- GET `/api/dashboard/summary`

---

## Assumptions
- Each user can access only their own financial records
- Admin has full control over the system
- Analyst and Viewer have restricted access

---

## Key Highlights
- Clean and scalable backend architecture
- Proper separation of concerns (MVC pattern)
- Efficient aggregation using MongoDB
- Secure authentication and authorization

---

## API Usage Examples

### Register
POST /api/auth/register

Body:
{
  "name": "Yash",
  "email": "yash@gmail.com",
  "password": "123456",
  "role": "admin"
}

---

### Login
POST /api/auth/login

Response:
{
  "token": "JWT_TOKEN",
  "user": { ... }
}

---

### Create Record (Admin only)
POST /api/records

Headers:
Authorization: Bearer TOKEN

Body:
{
  "amount": 500,
  "type": "expense",
  "category": "food",
  "notes": "lunch"
}

---

## Filtering

GET /api/records?type=expense&category=food  
GET /api/records?startDate=2024-01-01&endDate=2024-01-31

---

## Dashboard Response Example

GET /api/dashboard/summary

Response:
{
  "totalIncome": 5000,
  "totalExpense": 200,
  "netBalance": 4800,
  "categoryWise": [
    { "_id": "salary", "total": 5000 },
    { "_id": "food", "total": 200 }
  ],
  "recentTransactions": [...]
}

---

## Access Control Logic

- Viewer → Can only view records and dashboard  
- Analyst → Can view records and analytics  
- Admin → Full access  

Implemented using JWT Authentication and role-based middleware.

---

## Error Handling

- 400 Bad Request → Invalid input  
- 401 Unauthorized → Missing/invalid token  
- 403 Forbidden → Role not allowed  
- 404 Not Found → Resource not found  
- 500 Internal Server Error  

---

## Postman Collection

A Postman collection is included in the repository for easy API testing.

---

## Deployment

The backend is deployed on Render and can be accessed via:

https://finance-dashboard-backend-snq9.onrender.com

---

## Future Improvements

- Pagination for large datasets  
- Search functionality  
- Swagger API documentation  
- Unit & integration testing  

---

## Author
**Yash Chaurasia**  
B.Tech CSE (AI/ML)  
Backend Developer | MERN Stack  

---

## Final Note
This project demonstrates strong backend engineering fundamentals including system design, API development, and data handling — aligned with real-world industry practices.