# 🍬 Sweet Shop

The Sweet Shop Management System is a full-stack web application designed to manage sweets, inventory, and user purchases. It supports user authentication, admin controls, and sweet inventory management with Test-Driven Development (TDD) principles.

---

## 🚀 Features

👤 Authentication
- User registration and login with secure JWT authentication
- Role-based access: User vs Admin

🍭 Sweets Management
- Add, update, and delete sweets (Admin only)
- View all available sweets
- Search sweets by name, category, or price range

📦 Inventory Management
- Purchase sweets (quantity decreases automatically)
- Restock sweets (Admin only)
- Quantity tracking with "Out of Stock" indicator

🖥️ Frontend
- Modern SPA (React) with responsive UI
- User-friendly dashboard to view, search, and purchase sweets
- Admin panel for sweet and inventory management

🧪 Development Practices
- Built with TDD (Red-Green-Refactor cycle)
- High test coverage with meaningful test cases
- Clean, maintainable, and well-documented code

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express 
- **Authentication:** JWT (JSON Web Token)
- **Database:** MongoDB

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/VedantDewangan/Sweet-Shop.git
cd Sweet-Shop
```

### Frontend
```bash
cd .\frontend\
npm i
npm run dev
```

### Backend

#### 🔐 Environment Variables

To run this project, create a `.env` file in the backend directory and add variables shown below:

```env
PORT=YOUR_PORT_NUMBER
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_JWT_SECRET
```

Now to run backend

```bash
cd .\backend\
npm i
npm run dev
```

## 🔐 API Endpoints

### Auth
- ``` POST /api/auth/register ``` → Register a new user
- ``` POST /api/auth/login ``` → Login user and get JWT

### Sweets (Protected)
- ``` POST /api/sweets ``` → Add new sweet (Admin)
- ``` GET /api/sweets ``` → Get all sweets
- ``` GET /api/sweets/:search ``` → Search sweets
- ``` PUT /api/sweets/:id ``` → Update sweet (Admin)
- ``` DELETE /api/sweets/:id ``` → Delete sweet (Admin)

### Inventory (Protected)
- ``` POST /api/sweets/:id/purchase ``` → Purchase a sweet
- ``` POST /api/sweets/:id/restock ``` → Restock sweet (Admin)

## 📸 Screenshots

### 🔑 Login Page  
![Login Page](https://github.com/VedantDewangan/Sweet-Shop/raw/main/1_LoginPage.png)

### 🏠 Home Page  
![Home Page](https://github.com/VedantDewangan/Sweet-Shop/raw/main/2_HomePage.png)

### 🍭 Menu Page  
![Menu](https://github.com/VedantDewangan/Sweet-Shop/raw/main/3_Menu.png)

### 🛒 Admin Dashboard  
![Admin Home Page](https://github.com/VedantDewangan/Sweet-Shop/raw/main/4_AdminHomePage.png)

### ✏️ Update Sweet Details  
![Update Sweet Details](https://github.com/VedantDewangan/Sweet-Shop/raw/main/5_Update%20Sweet%20details.png)

### ➕ Add New Sweet  
![Add New Sweet](https://github.com/VedantDewangan/Sweet-Shop/raw/main/6_AddNewSweet.png)

## 🧪 Testing

This project was built following Test-Driven Development (TDD) principles to ensure reliability and maintainability. The backend has extensive test coverage for all API endpoints, including authentication and CRUD operations for sweets.

All tests have successfully passed, confirming the stability of the application's core logic.

For a detailed breakdown of all test cases, please see the public documentation:

[View Detailed Test Cases](https://docs.google.com/document/d/1j5LB7cIASSESlG4oVnNT4HI2rvqRtMXPeAvs2rIbFLk/edit?tab=t.0)

#### Testcase  
![test](https://github.com/VedantDewangan/Sweet-Shop/raw/main/7_test.png)

## 🤖 AI Usage and Development Process

This project was developed as an AI Kata, leveraging generative AI as a pair-programming partner to accelerate development and ensure best practices.

1. #### Frontend (ChatGPT): 
For the React frontend, ChatGPT was utilized to scaffold and implement key architectural patterns. Its primary contributions include:

- Structuring the Context API for robust state management across the application.

- Implementing the client-side logic for protected and public routes, ensuring proper access control.

2. #### Backend (Gemini 2.5 Pro): 
On the backend, Gemini 2.5 Pro was instrumental in building the core authentication system.

- It assisted in creating the JWT-based authentication flow, including token generation, cookie management, and verification middleware.

3. #### Testing (Gemini): 
The entire TDD process and testing suite were developed in close collaboration with Gemini.

- It played a key role in defining comprehensive test cases and generating the complete test files for both authentication and sweets API endpoints, ensuring high coverage and adherence to TDD principles.

## 📄 License

Licensed under the [MIT License](LICENSE).  
Feel free to use, modify, and share with attribution.

## 👨‍💻 Author
Built with ❤️ by Vedant Dewangan
