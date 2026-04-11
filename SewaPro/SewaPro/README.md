# 🛠️ SewaPro — Skilled Worker Management Platform

## Project Structure
```
SewaPro/
├── backend/     → Express.js + MongoDB API
└── frontend/    → React + Vite + Redux
```

---

## ⚡ Setup & Run Commands

### Backend
```bash
cd backend
npm install
npm run dev        # Development (nodemon)
npm start          # Production
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:3000
npm run build      # Production build
```

---

## 🚀 Deployment
Ensure both frontend and backend are running correctly. Check API endpoints using provided verification scripts.

---

## 🌍 Environment Variables

### backend/.env
```
PORT=5000
MONGO_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/sewapro
JWT_SECRET=your_strong_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_USER=your@email.com
EMAIL_PASS=yourpassword
```

### frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Future Dependencies to Add (Optional)
- `multer` + `cloudinary` → For profile photo uploads
- `nodemailer` → For email notifications
- `socket.io` → For real-time notifications
