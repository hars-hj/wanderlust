# Wanderlust — Hotel Booking Platform (Full Stack)

Wanderlust is a full-stack hotel booking platform with a **React (Vite)** frontend and a **Node.js/Express** backend. It supports authentication (sessions), listings + reviews CRUD, validation, and image uploads (Cloud config).

---

## Tech Stack

**Frontend**
- React + Vite
- Context API
- Tailwind CSS

**Backend**
- Node.js, Express.js
- MongoDB (Mongoose)
- Session-based Auth (Passport / sessions)
- Joi validation (via middleware)
- Image upload config (cloudconfig)

---

## Monorepo Structure

```txt
.
├── backend
│   ├── views/
│   ├── .env
│   ├── app.js
│   ├── cloudconfig.js
│   ├── middleware.js
│   ├── schema.js
│   ├── package.json
│   └── package-lock.json
└── frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── ListingsTest.jsx
    │   └── tailwind.css
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    ├── package-lock.json
    └── README.md
```
Getting Started
1) Clone the repo
git clone https://github.com/hars-hj/wanderlust.git
cd wanderlust
Backend Setup
2) Install backend dependencies
cd backend
npm install
3) Configure environment variables

Create backend/.env (you already have one—ensure it contains these keys):

# Server
PORT=3000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/wanderlust

# Sessions / Auth
SESSION_SECRET=your_secret_here

# If using Cloudinary (or similar) in cloudconfig.js
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

If your cloudconfig.js uses different variable names, match them exactly.

4) Run backend
npm start

(or)

npm run dev

Backend runs at:

http://localhost:3000 (or your chosen PORT)

Frontend Setup
5) Install frontend dependencies
cd ../frontend
npm install
6) Set API base URL (if needed)
 configure vite proxy in frontend/vite.config.js (example):

// proxy: { "/api": "http://localhost:3000" }
7) Run frontend
npm run dev

Frontend runs at:

http://localhost:5173 (default Vite port)

Running Both (2 terminals)

Terminal 1

cd backend
npm start

Terminal 2

cd frontend
npm run dev
    


