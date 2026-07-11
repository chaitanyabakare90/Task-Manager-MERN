# 📋 Task Manager MERN

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)

A full-stack **Task Management Application** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. The application enables users to create, view, update, and delete tasks through a clean, responsive, and intuitive interface.

## 🌐 Live Demo

🚀 **Application:**
**https://task-manager-frontend-ocza.onrender.com**


---

## ✨ Features

* ✅ Create new tasks
* ✅ View all tasks
* ✅ Update existing tasks
* ✅ Delete tasks
* ✅ Mark tasks as completed
* ✅ Responsive user interface
* ✅ RESTful API architecture
* ✅ Persistent data storage using MongoDB Atlas
* ✅ Axios-based communication between frontend and backend
* ✅ Fully deployed using Render
* ✅ Clean and modular project structure

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* dotenv
* cors

### Deployment

* Render (Frontend)
* Render (Backend)
* MongoDB Atlas

---

## 📂 Project Structure

```text
Task-Manager-MERN
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── ...
│
├── backend
│   ├── models
│   ├── routes
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/chaitanyabakare90/Task-Manager-MERN.git
cd Task-Manager-MERN
```

---

## ⚙️ Backend Setup

Install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder.

```env
ATLASDB_URL=your_mongodb_connection_string
PORT=8080
```

Start the backend server:

```bash
npm start
```

---

## ⚙️ Frontend Setup

Install dependencies:

```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder.

```env
VITE_API_URL=http://localhost:8080
```

Run the frontend:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/tasks`     | Fetch all tasks   |
| POST   | `/tasks`     | Create a new task |
| PUT    | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

---

## 📈 Future Enhancements

* User Authentication (JWT)
* Task Categories
* Task Priorities
* Due Dates
* Search & Filtering
* Drag & Drop Task Ordering
* Dark Mode
* Notifications

---

## 👨‍💻 Author

**Chaitanya Bakare**

* **GitHub:** https://github.com/chaitanyabakare90

---

## ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.
