Admin Dashboard – Full-Stack MERN Application

A modern, secure and fully functional **Admin Dashboard** built with the MERN stack.  
Designed to demonstrate real-world full-stack skills including authentication, role-based access control, protected routes, user management and dashboard analytics.

This project is ideal for **portfolios**, **job applications**, and **mid-level developer interviews**.

---


## 📸 Screenshots

> Add the 3 images in:  
> `frontend/public/screenshots/`

### 🔐 Login Page
<img width="1093" height="758" alt="Captura de pantalla 2025-11-29 230319" src="https://github.com/user-attachments/assets/d507dbb3-b92a-408b-b691-268bd5766589" />


### 📊 Dashboard Overview
<img width="1893" height="932" alt="Captura de pantalla 2025-11-29 230427" src="https://github.com/user-attachments/assets/3f6f1f80-8378-474c-baf7-c7c6a92a39e5" />


### 👥 Users Management
<img width="1896" height="835" alt="Captura de pantalla 2025-11-29 230451" src="https://github.com/user-attachments/assets/e7f1cdda-983e-4b99-8de2-c25ce196199c" />


---

## 🧩 Features

### 🔐 Authentication
- Register new users  
- Login with JWT tokens  
- Password hashing using bcrypt  
- Protected frontend & backend routes  
- Session persists using localStorage  

### 👥 User Management (CRUD)
- Create users  
- View all users  
- Delete users  
- Select role: `admin` / `user`  
- Fully protected by JWT middleware  

### 📊 Dashboard Analytics
- Real MongoDB statistics:
  - Total users  
  - New users in last 7 days  
  - Conversion rate  
- Responsive statistic cards  
- Recent activity (UI preview)  

### 🎨 UI/UX
- Fully modern dashboard UI  
- TailwindCSS v4  
- Dark mode style  
- Responsive layout  
- Sidebar navigation  
- Clean and professional design  

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)  
- TailwindCSS v4  
- Axios  
- React Router  
- Context API  

### **Backend**
- Node.js  
- Express.js  
- MongoDB / MongoDB Atlas  
- Mongoose  
- JSON Web Tokens (JWT)  
- bcrypt (password encryption)  

---

## 📁 Project Structure

admin-dashboard/
│
├── backend/
│ ├── src/
│ │ ├── config/db.js
│ │ ├── controllers/
│ │ │ ├── authController.js
│ │ │ ├── userController.js
│ │ │ └── statsController.js
│ │ ├── middleware/authMiddleware.js
│ │ ├── models/User.js
│ │ ├── routes/
│ │ │ ├── auth.routes.js
│ │ │ ├── user.routes.js
│ │ │ └── stats.routes.js
│ │ └── server.js
│ ├── .env
│ └── package.json
│
└── frontend/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ └── Users.jsx
│ ├── components/
│ ├── context/AuthContext.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── public/
│ └── screenshots/
│ ├── login.png
│ ├── dashboard.png
│ └── users.png
├── package.json
└── vite.config.js

yaml
Copiar código

---

## ⚙️ Backend Setup

### 1. Install dependencies
```bash
cd backend
npm install
2. Create .env
ini
Copiar código
PORT=5000
JWT_SECRET=YourSuperSecretKey
MONGO_URI=mongodb://127.0.0.1:27017/admin_dashboard
Replace with your MongoDB Atlas connection string if deploying.

3. Run backend
bash
Copiar código
npm run dev
Expected output:

arduino
Copiar código
🔥 Server running at http://localhost:5000
MongoDB connected
🎨 Frontend Setup
1. Install dependencies
bash
Copiar código
cd frontend
npm install
2. Run development server
bash
Copiar código
npm run dev
Open:
👉 http://localhost:5173/

🔐 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login and get token

Users (Protected)
Method	Endpoint	Description
GET	/api/users	Get all users
POST	/api/users	Create new user
DELETE	/api/users/:id	Delete user

Dashboard Stats (Protected)
Method	Endpoint	Description
GET	/api/stats/overview	Get dashboard metrics

🧠 Why This Project Is Valuable for Recruiters
This project demonstrates real-world full-stack skills:

Full authentication workflow

JWT authorization (frontend + backend)

CRUD operations

MongoDB queries & analytics

Clean folder structure

Modern React architecture

TailwindCSS professional UI

Secure password hashing

Protected API routes

Dashboard logic + metrics

It reflects the capabilities expected from a mid-level full-stack developer.

👤 Author
Christian David Jaramillo Rotavisky
Full Stack Developer

GitHub: https://github.com/christianjrk

⭐ Support
If you like this project, please star the repository ⭐
