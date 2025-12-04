# 🛰️ Lost & Found Platform (Real-Time, Family-Based, AI-Powered)

A real-time **Lost & Found tracking platform** that uses **AI-powered face matching**, **geo-fencing**, and **live location updates** to help families track missing members efficiently. The platform features **family-specific visibility**, **Socket.io live streaming**, and **MapLibre** for open-source maps.

---

## 🚀 Features

### 🔍 AI-Powered Face Matching

* Upload an image to search for potential matches across the user base.
* Uses a lightweight ML model to compute face embeddings and match similarity.

### 👨‍👩‍👧 Family-Based Visibility

* Each user belongs to a **family group**.
* Users can see only:

  * Their own family members
  * The family head
* Ensures privacy and secure access control.

### 📡 Real-Time Location Tracking

* Live location updates every **20 seconds** via **Socket.io**.
* Automatic re-subscription on reconnect.
* Shows the **last known location** if the user disconnects.

### 🗺️ Dynamic Map Visualization

* Uses **MapLibre GL** (fully open-source alternative to Google Maps).
* Real-time markers for all active family members.
* Smooth transitions based on live data stream.

### 🛡️ Geo-Fencing Alerts

* Define a safe region.
* Trigger warnings when a member moves **outside** the boundary.

### 🔐 Secure Backend

* Built using **Express.js**, **MongoDB**, and **JWT authentication**.
* Role-based access (Family Head, Member).
* Robust validation and error handling.

---

## 🏗️ Tech Stack

### **Frontend**

* React.js
* JavaScript (ES6)
* MapLibre GL
* Socket.io Client

### **Backend**

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io Server
* JWT Authentication

### **AI / ML**

* Face embedding generation
* Image similarity scoring
* Lightweight model for fast inference

---

## 📁 Folder Structure

```
/client
  /src
    /components
    /pages
    /hooks
    /utils

/server
  /controllers
  /models
  /routes
  /middlewares
  /services

/ml-service (optional)
  /face-matching
```

---

## 🔧 Environment Variables

Create a `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your-secret-key
```

If using an external ML service:

```
ML_SERVICE_URL=http://localhost:8000/match
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lost-and-found.git
cd lost-and-found
```

### 2️⃣ Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 3️⃣ Start the App

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm start
```

---

## ⚡ Real-Time Flow Overview

1. User logs in → receives JWT token.
2. User shares live location → Socket.io sends updates every 20 seconds.
3. Backend stores last known location and broadcasts to relevant family members.
4. Map updates markers in real time.
5. Geo-fence rules checked for every update → send alert if breached.
6. For missing person reports → Face matching generates top similarity matches.

---


## 🧪 API Endpoints (Short Version)

### **Auth**

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Create account    |
| POST   | /auth/login    | Login & get token |

### **Family & Users**

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| GET    | /family/members | List family members |
| POST   | /family/add     | Add a new user      |

### **Location**

| POST | /location/update | Update user location |
| GET | /location/last | Get last known location |

### **AI**

| POST | /ai/match | Upload image & find similar faces |

---

## 🧩 Architecture Diagram (Text Version)

```
[React Frontend] 
    ↕ Socket.io
    ↕ REST APIs
[Express Backend] 
    ↕
[MongoDB]

[Optional ML Face-Matching Service]
```

---

## 📜 License

MIT License.

---

