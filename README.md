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


cd frontend
npm run dev
    


