# 🚀 Courses Management API

A **Course Management System** built with **Node.js, Express, and MongoDB**, tested using **Postman**. This API supports **creating, reading, updating, and deleting (CRUD) courses and users** efficiently.

## 🛠️ Technologies Used
- **Node.js** - Runtime environment
- **Express.js** - Backend framework
- **MongoDB** - NoSQL database
- **Postman** - API testing

## 📂 Project Structure
```
📦 courses-management-api
├── 📂 controller       # Business logic handlers
├── 📂 data             # Database-related files
├── 📂 middleware       # Custom middlewares (authentication, validation, etc.)
├── 📂 models           # Mongoose models
├── 📂 routes           # API routes
│   ├── userRoutes.js   # User-related routes
│   ├── courseRoutes.js # Course-related routes
├── 📂 utils            # Utility functions (helpers, error handling, etc.)
├── 📂 uploads          # Storage for uploaded files (e.g., avatars)
├── .env               # Environment variables
├── .gitignore         # Ignore unnecessary files
├── index.js           # Main entry point
├── package-lock.json  # Dependency lock file
├── package.json       # Project dependencies
├── README.md          # Project documentation
```

## 🚀 Getting Started
### 1️⃣ Install Dependencies
```sh
npm install
```
### 2️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_JWT_Secret_Key
```
### 3️⃣ Run the Server
```sh
npm start
```
The API will be available at: `http://localhost:3000`

## 🔗 API Endpoints
### 📌 User Routes
| Method | Endpoint            | Description                |
|--------|---------------------|----------------------------|
| GET    | `/api/users`        | Get all users (Auth needed) |
| POST   | `/api/users/register` | Register a new user (with avatar upload) |
| POST   | `/api/users/login`  | Login a user              |

### 📌 Course Routes
| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| GET    | `/api/courses`         | Get all courses          |
| GET    | `/api/courses/:id`     | Get a specific course    |
| POST   | `/api/courses`         | Create a new course      |
| PUT    | `/api/courses/:id`     | Update a course         |
| DELETE | `/api/courses/:id`     | Delete a course         |

## 🤝 Contributing
Want to contribute? Follow these steps:
1. **Fork** the project.
2. Create a **new branch**:
   ```sh
   git checkout -b feature/YourFeatureName
   ```
3. Make changes and **add them**:
   ```sh
   git add .
   ```
4. Commit your changes:
   ```sh
   git commit -m "Add some feature"
   ```
5. Push to the branch:
   ```sh
   git push origin feature/YourFeatureName
   ```
6. **Open a Pull Request**.

## 📩 Contact
For any inquiries, feel free to reach out:
📧 **elfeshawy2001@gmail.com**

## ⚠️ Notes
- Replace `your_mongodb_connection_string` with your actual **MongoDB connection string**.

---
Made with ❤️ by **Your Name** 🚀

