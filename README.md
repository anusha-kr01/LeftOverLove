# 🍱 LeftoverLove

**LeftoverLove** is a full-stack web application built during a hackathon to connect individuals, restaurants, and events with excess food to nearby NGOs or people in need. It helps reduce food waste and feeds those who need it most.

---

## 🚀 Features

* 🔐 **User Authentication** (Firebase Auth)
* 📍 **Geo-location Based Matching**
* 📦 **Donor Dashboard** – Post food availability
* 🧑‍🤝‍🧑 **NGO/Receiver Dashboard** – Claim nearby donations
* 📅 **Real-time Availability Tracking**
* 📬 **Notifications & Email Alerts**
* 📊 **Food Waste Metrics** for analytics

---

## 🛠️ Tech Stack

| Layer        | Tech Used                 |
| ------------ | ------------------------- |
| **Frontend** | React, Tailwind CSS       |
| **Backend**  | Node.js, Express.js       |
| **Database** | Firebase Firestore        |
| **Auth**     | Firebase Authentication   |
| **Hosting**  | Firebase Hosting / Vercel |

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/anusha-kr01/leftoverlove.git
cd leftoverlove #might differ, check accordingly

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 🔑 Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore and Authentication (Email/Password or Google)
3. Get your Firebase config object and replace it in the `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 🤝 Team

* **Anusha K R** – Full Stack Dev
* *Krupa M U* – UI/UX & frontend
* *Dhanyashree* – Backend & Firebase Integration
* *Kushi B G* – UI/UX & Frontend

---

## 🌍 Inspiration

Inspired by the idea of using tech for good, *LeftoverLove* is our effort to fight food wastage and hunger using a clean, modern tech stack.

---

## 📄 License

MIT License

---
